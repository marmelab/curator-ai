import OpenAI from 'openai';
import { config } from 'dotenv';

config();

export interface GetCompletionOptions {
    messages: OpenAI.Chat.ChatCompletionCreateParams.ChatCompletionCreateParamsNonStreaming['messages'];
    model?: string;
    temperature?: number;
    top_p?: number;
}

export const getCompletion = async ({
    messages,
    model = 'gpt-3.5-turbo-1106',
    temperature = 0.7,
    top_p = 1,
}: GetCompletionOptions) => {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY not set');
    }
    const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openAI.chat.completions.create({
        messages,
        model,
        temperature,
        top_p,
    });
    return completion.choices[0];
};
