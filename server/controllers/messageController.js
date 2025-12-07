import imagekit from "../configs/imagekit.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import axios from "axios";
import openai from "../configs/openai.js";
// Text-based AI controller
export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

         if(req.user.credits < 1) {
            return res.json({ 
                success: false, 
                message: "You don't have enough credits to use this feature" 
            });
        }

        const { chatId, prompt } = req.body;

        const chat = await Chat.findOne({userId, _id: chatId});
        chat.messages.push({ role: "user", content: prompt, timestamp: Date.now(), isImages: false });

        const {choices} = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ]
        });

        const reply = { ...choices[0].message, timestamp: Date.now(), isImages: false };
        
        chat.messages.push(reply);
        await chat.save();
        await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

    } catch (error) {
        console.error('❌ Text Message Error:', error);
        
        // ✅ ALWAYS return proper JSON with status
        if (error.message?.includes('quota') || error.message?.includes('429')) {
            return res.status(429).json({ 
                success: false, 
                message: "Rate limit exceeded. Please wait 60 seconds and try again." // ✅ Clear message
            });
        }
        
        if (error.message?.includes('API key')) {
            return res.status(500).json({ 
                success: false, 
                message: "AI service configuration error. Please contact support."
            });
        }
        
        // ✅ Default error response
        return res.status(500).json({ 
            success: false, 
            message: error.message || "Failed to generate response. Please try again."
        });
    }
}

// Image-based AI controller
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        // Check credits
        if(req.user.credits < 2) {
            return res.json({ 
                success: false, 
                message: "You don't have enough credits to use this feature" 
            });
        }

        const { prompt, chatId, isPublished } = req.body;
        
        const chat = await Chat.findOne({userId, _id: chatId});

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
        res.json({ success: false, message: error.message || "Failed to generate image" });
    }
}