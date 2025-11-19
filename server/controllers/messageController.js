import Chat from "../models/Chat.js";
import User from "../models/user.js";
// text-based AI controller";

export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { chatId, prompt } = req.body;

        const chat = await Chat.findOne({ _id: chatId, userId });
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