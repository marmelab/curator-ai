import * as cheerio from 'cheerio';

export interface ExtractLinksOptions {
    url: string;
}

export const extractLinks = async ({ url }: ExtractLinksOptions) => {
    const response = await fetch(url);
    if (!response) return [];
    const $ = cheerio.load(await response.text());

    const regex = new RegExp(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    );

    const links = $('a')
        .toArray()
        .filter(el => {
            const link = $(el).attr('href');
            if (!link) return false;
            // keep only external links
            if (!regex.test(link)) return false;

            // keep only links from different subdomains
            const augmentedUrl = new URL(url);
            const augmentedLink = new URL(link);
            if (augmentedUrl.hostname === augmentedLink.hostname) return false;

            // keep only links from different domains
            const urlDomain = getDomain(augmentedUrl.hostname);
            const linkDomain = getDomain(augmentedLink.hostname);

            if (urlDomain === linkDomain) return false;
            return true;
        })
        .map(el => $(el).attr('href') as string);

    return links;
};

const getDomain = (hostname: string) => hostname.split('.').slice(-2).join('.');
