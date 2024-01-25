import * as cheerio from 'cheerio';

const maxSize = 12000;

export const scrape = async (url: string) => {
    const page = await fetch(url);
    const $ = await cheerio.load(await page.text());
    return $('body').text().substring(0, maxSize);
};
