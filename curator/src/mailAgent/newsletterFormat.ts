import { curate } from '../curate';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import { Summary } from '../types';

const links = [
    'https://www.fromjason.xyz/p/notebook/where-have-all-the-websites-gone/',
    'https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/',
    'https://biomejs.dev/blog/biome-v1-5/',
    'https://birtles.blog/2024/01/06/weird-things-engineers-believe-about-development/',
    'https://julesblom.com/writing/flushsync',
];
const window = new JSDOM('').window;
const purify = DOMPurify(window);

function formatNewsletterMarkdown(articles: Summary[]) {
    const formatArticle = (article: Summary) => {
        const title = purify.sanitize(article.title || 'Title not available');
        const author = purify.sanitize(article.author || 'Unknown author');
        const summary = purify.sanitize(
            article.summary || 'Summary not available.'
        );
        const link = purify.sanitize(article.link || '#');

        return `### ${title}\n
                *by ${author}*\n
                🔗 [Read the full article](${link})\n\n
                > ${summary}\n\n`;
    };

    // If there are no new articles
    if (articles.length === 0) {
        return `
            Newsletter\n\n
            Hello hello ! Sorry, no new articles today. But don't worry, we'll be back soon with more news!\n
            See you soon!\n
            `;
    }

    return `
        Newsletter\n\n
        Hello everyone! Here are the latest news!\n\n
        ${articles.map(formatArticle).join('')}\n
        That's all for now! See you soon for more news!\n
    `;
}

function formatNewsletterHtmlWithCSS(articles: Summary[]) {
    // Format a single article
    const formatArticle = (article: Summary) => {
        const title = purify.sanitize(article.title || 'Title not available');
        const author = purify.sanitize(article.author || 'Unknown author');
        const summary = purify.sanitize(
            article.summary || 'Summary not available.'
        );
        const link = purify.sanitize(article.link || '#');

        return `
        <div style="margin-bottom: 30px; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h3 style="color: #FF5722; font-size: 24px;">${title}</h3>
            <p style="font-size: 16px; font-weight: bold; color: #555;">by ${author}</p>
            <p style="font-size: 16px;">
                <a href="${link}" style="color: #1E88E5; text-decoration: none; font-weight: bold;">Read the full article</a>
            </p>
            <blockquote style="font-size: 16px; color: #777; border-left: 4px solid #ddd; padding-left: 15px;">${summary}</blockquote>
        </div>`;
    };

    // If there are no new articles
    if (articles.length === 0) {
        return `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; padding: 20px; border-radius: 10px; max-width: 800px; margin: 0 auto;">
            <h1 style="color: #4CAF50; text-align: center; font-size: 32px;">Newsletter</h1>
            <p style="font-size: 18px; text-align: center;">Hello hello ! Sorry, no new articles today. But don't worry, we'll be back soon with more news!</p>
            <p style="font-size: 18px; text-align: center;">See you soon!</p>
        </div>`;
    }

    // Main newsletter structure
    const htmlNewsletter = `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; padding: 20px; border-radius: 10px; max-width: 800px; margin: 0 auto;">
        <h1 style="color: #4CAF50; text-align: center; font-size: 32px;">Newsletter</h1>
        <p style="font-size: 18px; text-align: center;">Hello everyone! Here are the latest news!</p>
        ${articles.map(formatArticle).join('')}
    </div>`;

    return htmlNewsletter;
}

// TODO : add parameters based on user (links,interests?,maxArticles?,maxContentSize?)

export async function curateAndGenerateNewsletter() 
: Promise<{
    markdown: string;
    html: string;
}> 
{
    return curate({
        links,
        interests: ['lego'],
        max: 5,
        minimumDate : new Date('2025-02-01'),
    })
        .then((curatedLinks: Summary[]) => {
            // Generate the formatted string when promise completed
            
            const markdown = formatNewsletterMarkdown(curatedLinks);
            const html = formatNewsletterHtmlWithCSS(curatedLinks);

            // Returns raw json and formatted newletters
            return { markdown, html };
        })
        .catch((err: unknown) => {
            // Will most likely be instance of Error TODO : check if there are different error cases

            if (err instanceof Error) {
                console.error('Error during link curation: ', err.message);
            } else {
                console.error('Unknown error occurred during link curation');
            }
            console.error('Error during link curation: ', err);
            return { markdown: '', html: '' };
        });
}
