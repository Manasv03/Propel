import imagekit from "../configs/imagekit.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import axios from "axios";
import openai from "../configs/openai.js";
// text-based AI controller";

export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id;
        // check credits
        if(req.user.credits < 1) {
            return res.json({ success: false, message: "You don't have enough credits to use this feature" });
        }

        const { chatId, prompt } = req.body;

        const chat = await Chat.findOne({userId, _id: chatId});
        chat.messages.push({ role: "user", content: prompt, timestamp: Date.now(), isImages: false});

        const {choices} = await openai.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    });
    const reply = {...choices[0].message, timestamp: Date.now(), isImages: false};

    res.json({ success: true, reply });

    chat.messages.push(reply);
    await chat.save();

    await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// image-based AI controller
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        // check credits
        if(req.user.credits < 2) {
            return res.json({ success: false, message: "You don't have enough credits to use this feature" });
        }

        const { prompt, chatId, isPublished } = req.body;
        
        // Find Chat
        const chat = await Chat.findOne({userId, _id: chatId});
        // Add user message to chat
        chat.messages.push({ role: "user", content: prompt, timestamp: Date.now(), isImages: false});

        // Encode prompt
        const encodedPrompt = encodeURIComponent(prompt);

        // Generate image using Gemini API
        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/propel/${Date.now()}.png?tr-w-800,h-800`;

        // Trigger image generation from ImageKit
        const aiImageResponse = await axios.get(generatedImageUrl, {responseType: 'arraybuffer'});

        // Convert to base64
        const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data, "binary").toString('base64')}`;

        // Upload to ImageKit
        const uploadResponse = await imagekit.upload({
            file: base64Image,
            fileName: `${Date.now()}.png`,
            folder: "propel"
        })

        const reply = {role: "assistant", content: uploadResponse.url, timestamp: Date.now(), isImages: true, isPublished};

        res.json({ success: true, reply });

        chat.messages.push(reply);
        await chat.save();

        await User.updateOne({ _id: userId }, { $inc: { credits: -2 } });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
}