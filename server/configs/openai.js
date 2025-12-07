import OpenAI from "openai";

console.log('🔑 Initializing Gemini...');
console.log('API Key exists:', !!process.env.GEMINI_API_KEY);
console.log('API Key length:', process.env.GEMINI_API_KEY?.length);
console.log('API Key starts with AIza:', process.env.GEMINI_API_KEY?.startsWith('AIza'));

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export default openai;