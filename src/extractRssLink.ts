import Parser from 'rss-parser';

/**
 * Extracts the links from the given RSS feed
 *
 * @param   string  feedLink  the link to the RSS feed
 *
 * @return  Promise<string[]>            a promise that resolves to an array of links
 */
export const extractRssLink = async (feedLink: string) => {
    const parser = new Parser();
    const feed = await parser.parseURL(feedLink);
    return feed.items
        .filter(item => item.link !== undefined)
        .map(item => item.link as string);
};
