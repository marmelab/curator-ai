const { curate } = require('curator-ai');

import { Summary } from "../types";

// links to curate from (TODO : make it based on user preference)

const links = [
    'https://stability.ai/news/stable-code-2024-llm-code-completion-release',
    'https://www.fromjason.xyz/p/notebook/where-have-all-the-websites-gone/',
    'https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/',
    'https://biomejs.dev/blog/biome-v1-5/',
    'https://birtles.blog/2024/01/06/weird-things-engineers-believe-about-development/',
    'https://julesblom.com/writing/flushsync',
];

// Formats the newsletter in markdown 
// articles : Summary[]
// 
// return newsletter : String

function formatNewsletterMarkdown(articles : Summary[]) {

    // Newletter's header

    let newsletter = 'Newsletter MARKDOWN\n\n';
    newsletter += "Hello everyone! Here are the latest news!\n\n";

    // Formatting for each article

    articles.forEach(article => {
        const title = article.title || "Title not available";
        const author = article.author || "Unknown author";
        const summary = article.summary || "Summary not available.";
        const link = article.link || "#";

        
        newsletter += `### ${title}\n`;
        newsletter += `*by ${author}*\n`;
        newsletter += `🔗 [Read the full article](${link})\n\n`;
        newsletter += `> ${summary}\n\n`;
    });

    // Footer

    newsletter += "\nThat's all for now! See you soon for more news!\n";

    return newsletter;
}

// Formats the newsletter in html (no style) 
// articles : Summary[]
// 
// return newsletter : String

function formatNewsletterHtml(articles: Summary[]) {

    // Header

    let htmlNewsletter = '<div style="font-family: Arial, sans-serif;">';
    htmlNewsletter += '<h1>Newsletter HTML</h1>';
    htmlNewsletter += '<p>Hello everyone! Here are the latest news!</p>';

    // Dynamic formatting for each article

    articles.forEach(article => {
        const title = article.title || "Title not available";
        const author = article.author || "Unknown author";
        const summary = article.summary || "Summary not available.";
        const link = article.link || "#";

        
        htmlNewsletter += '<h3>' + title + '</h3>' +
            '<p><strong>by ' + author + '</strong></p>' +  
            '<p><a href="' + link + '">Read the full article</a></p>' +
            '<blockquote>' + summary + '</blockquote>';
    });

    return htmlNewsletter;
}

// Formats the newsletter in html with style
// articles : Summary[]
// 
// return newsletter : String

function formatNewsletterHtmlWithCSS(articles: Summary[]) {

    // Header

    let htmlNewsletter = `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; padding: 20px; border-radius: 10px; max-width: 800px; margin: 0 auto;">
        <h1 style="color: #4CAF50; text-align: center; font-size: 32px;">Newsletter HTML</h1>
        <p style="font-size: 18px; text-align: center;">Hello everyone! Here are the latest news!</p>
    `;

    // Formatting each article

    articles.forEach(article => {
        const title = article.title || "Title not available";
        const author = article.author || "Unknown author";
        const summary = article.summary || "Summary not available.";
        const link = article.link || "#";

        htmlNewsletter += `
        <div style="margin-bottom: 30px; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h3 style="color: #FF5722; font-size: 24px;">${title}</h3>
            <p style="font-size: 16px; font-weight: bold; color: #555;">by ${author}</p>
            <p style="font-size: 16px;"><a href="${link}" style="color: #1E88E5; text-decoration: none; font-weight: bold;">Read the full article</a></p>
            <blockquote style="font-size: 16px; color: #777; border-left: 4px solid #ddd; padding-left: 15px;">${summary}</blockquote>
        </div>
        `;
    });

    htmlNewsletter += '</div>';
    return htmlNewsletter;
}

// Uses the curate function to generate newsletter data and formats output to be used in mail
// TODO : add parameters based on user (links,interests?,maxArticles?,maxContentSize?)

export function curateAndGenerateNewsletter(): Promise<{json:string, markdown: string, html: string }> {
    
    return curate({
        links,
        interests: ['react', 'ai'],
        max: 5,
    }).then((curatedLinks: Summary[]) => {

        // Generate the formatted string when promise completed

        const markdown = formatNewsletterMarkdown(curatedLinks);
        const html = formatNewsletterHtmlWithCSS(curatedLinks);

        // Returns raw json and formatted newletters

        return { curatedLinks, markdown, html};

    }).catch((err: unknown) => {

        // Will most likely be instance of Error TODO : check if there are different error cases

        if (err instanceof Error) {
            console.error("Error during link curation: ", err.message);
        } else {
            console.error("Unknown error occurred during link curation");
        }
        return "Failed to generate newsletter.";
    });
}