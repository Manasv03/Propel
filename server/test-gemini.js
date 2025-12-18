import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

async function testGemini() {
    try {
        console.log('Testing Gemini API Connection...');

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error('❌ Error: GEMINI_API_KEY is missing in .env');
            return;
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        // Try with and without prefix if needed, but starting with simple name
        const modelName = "gemini-2.5-flash";
        console.log(`Using model: ${modelName}`);

        const model = genAI.getGenerativeModel({ model: modelName });

        console.log('Sending test prompt...');
        const result = await model.generateContent("Hello, are you online?");
        const response = await result.response;
        const text = response.text();

        console.log('✅ Success! Response:', text);
    } catch (error) {
        console.error('❌ Failed:', error.message);
        if (error.response) {
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        }
    }
}

testGemini();
