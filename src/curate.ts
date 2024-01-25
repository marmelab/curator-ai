import { scrape } from './scrape';
import { summarizeArticle } from './summarizeArticle';
import type { Summary } from './types';

export interface CurateOptions {
    links: string[];
    interests?: string[];
    max?: number;
    maxContentSize?: number;
    onProgress?: (progress: number) => void;
}

export const curate = async ({
    links,
    interests = [],
    max = 5,
    maxContentSize,
    onProgress,
}: CurateOptions) => {
    const summaries = await scrapeAndSummarizeArticles({
        links,
        interests,
        maxContentSize,
        onProgress,
    });
    const mostRelevantArticles = getMostRelevant({ summaries, max });
    return mostRelevantArticles;
};

interface ScrapeAndSummarizeArticlesOptions {
    links: string[];
    interests?: string[];
    maxContentSize?: number;
    onProgress?: (progress: number) => void;
}

const scrapeAndSummarizeArticles = async ({
    links,
    interests = [],
    maxContentSize,
    onProgress = () => {},
}: ScrapeAndSummarizeArticlesOptions) => {
    const content: Summary[] = [];
    for (let i = 0; i < links.length; i++) {
        const text = await scrape({ url: links[i], maxContentSize });
        onProgress(i + 0.5);
        const summary = await summarizeArticle({
            text,
            link: links[i],
            interests,
        });
        if (summary) content.push(summary);
        onProgress(i + 1);
    }
    return content;
};

const getMostRelevant = ({
    summaries,
    max = 5,
}: {
    summaries: Summary[];
    max?: number;
}) =>
    summaries
        .sort((a, b) => b.relevancy_score - a.relevancy_score)
        .slice(0, max);
