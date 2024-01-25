import { scrape } from './scrape';
import { summarizeArticle } from './summarizeArticle';
import type { Summary } from './types';

interface ScrapeAndSummarizeArticlesOptions {
    links: string[];
    interests?: string[];
}

const scrapeAndSummarizeArticles = async ({
    links,
    interests = [],
}: ScrapeAndSummarizeArticlesOptions) => {
    const content: Summary[] = [];
    for (const link of links) {
        const text = await scrape(link);
        const summary = await summarizeArticle({ text, link, interests });
        if (summary) content.push(summary);
    }
    return content;
};

const getMostRelevant = (summaries: Summary[], max = 5) =>
    summaries
        .sort((a, b) => b.relevance_score - a.relevance_score)
        .slice(0, max);

export const curate = async (
    links: string[],
    interests: string[] = [],
    maxRelevant = 5
) => {
    const summaries = await scrapeAndSummarizeArticles({ links, interests });
    const mostRelevantArticles = getMostRelevant(summaries, maxRelevant);
    return mostRelevantArticles;
};
