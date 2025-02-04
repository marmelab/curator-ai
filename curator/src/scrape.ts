import { Readability } from '@mozilla/readability';
import * as cheerio from 'cheerio';
import { JSDOM } from 'jsdom';
import { parse, isValid } from 'date-fns';

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
    const publicationDate = await scrapeDate($);

    console.log('publicationDate', publicationDate);

    return {
        text: article?.textContent.substring(0, maxContentSize),
        date: publicationDate
    };
};

async function scrapeDate($: cheerio.CheerioAPI) {
    // Extract the latest date of publication
    let latestDate: Date | null = null;
    let publicationDate: string | null = null;

    const dateFormats = [
        "yyyy-MM-dd'T'HH:mm:ssXXX",
        "yyyy-MM-dd'T'HH:mm:ss.SSSXXX",
        "yyyy-MM-dd",
        "MM/dd/yyyy",
        "dd-MM-yyyy",
        "MMMM d, yyyy",
        "MMM d, yyyy",
        "d MMMM yyyy",
        "d MMM yyyy"
    ];

    $('time').each((index, element) => {
        const timeTag = $(element);
        const dateTimeAttr = timeTag.attr('datetime');
        const dateText = timeTag.text();
        let date: Date | null = null;

        if (dateTimeAttr) {
            date = new Date(dateTimeAttr);
        } else if (dateText) {
            for (const format of dateFormats) {
                const parsedDate = parse(dateText, format, new Date());
                if (isValid(parsedDate)) {
                    date = parsedDate;
                    break;
                }
            }
        }

        if (date && (!latestDate || date > latestDate)) {
            latestDate = date;
            publicationDate = date.toISOString();
        }
    });

    // Check for meta tags with name="date" or property="article:published_time"
    if (!publicationDate) {
        const metaDate = $('meta[name="date"], meta[property="article:published_time"]');
        if (metaDate.length > 0) {
            publicationDate = metaDate.attr('content') ?? null;
        }
    }

    // Check for specific classes or IDs (example: .publication-date, #pub-date)
    if (!publicationDate) {
        const specificDate = $('.publication-date, #pub-date');
        if (specificDate.length > 0) {
            publicationDate = specificDate.text();
        }
    }

    if (!publicationDate) {
        console.warn('No publication date found');
        return new Date(0); // Return the Unix epoch start date (January 1, 1970)
    }

    return new Date(publicationDate);

}
