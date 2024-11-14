import { Readability } from '@mozilla/readability';
import * as cheerio from 'cheerio';
import { JSDOM } from 'jsdom';

export interface ScrapeOptions {
    url: string;
    maxContentSize?: number;
}

export const scrape = async ({
    url,
    maxContentSize = 12000,
}: ScrapeOptions) => {
    const response = await fetch(url);
    const $ = cheerio.load(await response.text());
    const dom = new JSDOM($.html());
    const article = new Readability(dom.window.document).parse();
    return article?.textContent.substring(0, maxContentSize);
};
