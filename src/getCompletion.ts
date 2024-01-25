import OpenAI from 'openai';
import { config } from 'dotenv';

config();

if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not set');
}

const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const getCompletion = async (text: string, prompt: string) => {
    const completion = await openAI.chat.completions.create({
        messages: [
            { role: 'system', content: prompt },
            { role: 'user', content: text },
        ],
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        top_p: 1,
    });
    return completion.choices[0];
};
