import OpenAI from 'openai';
import 'dotenv/config';
import { config } from 'dotenv';
import path from 'node:path';
import fs from 'node:fs';
import * as cheerio from 'cheerio';

interface Summary {
    summary: string;
    relevance_score: number;
    author: string;
    link: string;
}

const maxTokens = 4097;

config({
    path: path.resolve('./.env.local'),
});

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const parsePage = async (url: string) => {
    const page = await fetch(url);
    const $ = await cheerio.load(await page.text());
    return $('body').text().substring(0, maxTokens);
};

const sumUpAI = async (text: string, prompt: string) => {
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

const generateTmpFileName = (ext: 'json' | 'txt') => {
    const timestamp = new Date().getTime();
    return path.resolve(`./tmp/tmp${timestamp}.tmp.${ext}`);
};

const bulkSumUp = async (links: string[]) => {
    const fileName = path.resolve(generateTmpFileName('json'));
    const content = [];
    for (let i = 0; i < links.length; i++) {
        const sumUp = await sumUpAI(
            await parsePage(links[i]),
            "You will be provided with a technical article, and your task is to summarize the article as follows:\n\n- summarize the article knowing I'm a developper\n- rate it by relevance from 1 to 10: the more the article talks about React the more it is relevant\n- shape your answer in JSON format as follows:\n    - summary: the summary of the article \n    - relevance_score: the relevance score\n    - author: the article's author"
        );
        if (!sumUp.message.content) return;
        const payload = {
            ...JSON.parse(sumUp.message.content),
            link: links[i],
        };
        content.push(payload);
    }

    fs.writeFileSync(path.resolve(fileName), JSON.stringify(content), {
        flag: 'a+',
    });
    return fileName;
};

const getMostRelevant = (data: Summary[], max = 5) => {
    return data
        .sort((a, b) => b.relevance_score - a.relevance_score)
        .slice(0, max);
};

export const sumUp = async (links: string[], maxRelevant = 5) => {
    const tmpArticlesFileName = await bulkSumUp(links);
    if (!tmpArticlesFileName) return null;

    const data = fs.readFileSync(tmpArticlesFileName, {
        encoding: 'utf8',
        flag: 'r',
    });
    const mostRelevantArticles = getMostRelevant(JSON.parse(data), maxRelevant);
    return mostRelevantArticles;
};
