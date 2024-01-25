import * as cheerio from 'cheerio';

export interface ScrapeOptions {
    url: string;
    maxContentSize?: number;
}

export const scrape = async ({
    url,
    maxContentSize = 12000,
}: ScrapeOptions) => {
    const response = await fetch(url);
    const $ = await cheerio.load(await response.text());
    return $('body').text().substring(0, maxContentSize);
};
