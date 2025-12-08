import imagekit from "../configs/imagekit.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import axios from "axios";
import opensi from "../configs/openai.js";
import genAI from "../configs/gemini.js";

// Text-based AI controller
export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        if (req.user.credits < 1) {
            return res.status(402).json({
                success: false,
                message: "You don't have enough credits to use this feature"
            });
        }

        const { chatId, prompt } = req.body;

        const chat = await Chat.findOne({ userId, _id: chatId });

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found"
            });
        }

        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImages: false
        });

        console.log('Generating response with Gemini...');

        // Use Gemini 2.5 Flash
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: {
                temperature: 0.9,
                maxOutputTokens: 2048,
            }
        });

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        console.log('✅ Response generated successfully');

        const reply = {
            role: "assistant",
            content: text,
            timestamp: Date.now(),
            isImages: false
        };

        res.json({ success: true, reply });

        chat.messages.push(reply);
        await chat.save();
        await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

    } catch (error) {
        console.error('❌ Text Message Error:', error);
        console.error('Error details:', error.message);
        if (error.response) {
            console.error('API Error Status:', error.response.status);
            console.error('API Error Text:', error.response.statusText);
        }

        // Handle specific Gemini errors
        if (error.message?.includes('RESOURCE_EXHAUSTED') ||
            error.message?.includes('quota') ||
            error.message?.includes('429')) {
            return res.status(429).json({
                success: false,
                message: "Rate limit exceeded. Please wait 60 seconds and try again."
            });
        }

        if (error.message?.includes('API_KEY_INVALID') ||
            error.message?.includes('INVALID_ARGUMENT')) {
            return res.status(500).json({
                success: false,
                message: "API key error. Please check your Gemini API configuration."
            });
        }

        if (error.message?.includes('PERMISSION_DENIED')) {
            return res.status(500).json({
                success: false,
                message: "API access denied. Please enable the Generative Language API in Google Cloud Console."
            });
        }

        if (error.message?.includes('Not Found') || error.response?.status === 404) {
            return res.status(500).json({
                success: false,
                message: "Selected AI model is not available. Please check model configuration."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to generate response. Please try again."
        });
    }
}

// Image-based AI controller
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        if (req.user.credits < 2) {
            return res.status(402).json({
                success: false,
                message: "You don't have enough credits to use this feature"
            });
        }

        const { prompt, chatId, isPublished } = req.body;

        const chat = await Chat.findOne({ userId, _id: chatId });

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found"
            });
        }

        chat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImages: false
        });

        const encodedPrompt = encodeURIComponent(prompt);
        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/propel/${Date.now()}.png?tr=w-800,h-800`;

        const aiImageResponse = await axios.get(generatedImageUrl, {
            responseType: 'arraybuffer',
            timeout: 30000
        });

        const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data, "binary").toString('base64')}`;

        const uploadResponse = await imagekit.upload({
            file: base64Image,
            fileName: `${Date.now()}.png`,
            folder: "propel"
        });

        const reply = {
            role: "assistant",
            content: uploadResponse.url,
            timestamp: Date.now(),
            isImages: true,
            isPublished
        };

        res.json({ success: true, reply });

        chat.messages.push(reply);
        await chat.save();
        await User.updateOne({ _id: userId }, { $inc: { credits: -2 } });

    } catch (error) {
        console.error('❌ Image Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to generate image"
        });
    }
}