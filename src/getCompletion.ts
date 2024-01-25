import OpenAI from 'openai';
import { config } from 'dotenv';

config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const getCompletion = async (text: string, prompt: string) => {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: prompt,
            },
            {
                role: 'user',
                content: text,
            },
        ],
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        //max_tokens: 64,
        top_p: 1,
    });
    return completion.choices[0];
};
