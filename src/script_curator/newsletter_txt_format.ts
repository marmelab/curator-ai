import { Summary } from "../types";

const { curate } = require('curator-ai');

const links = [
    'https://stability.ai/news/stable-code-2024-llm-code-completion-release',
    'https://www.fromjason.xyz/p/notebook/where-have-all-the-websites-gone/',
    'https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/',
    'https://biomejs.dev/blog/biome-v1-5/',
    'https://birtles.blog/2024/01/06/weird-things-engineers-believe-about-development/',
    'https://julesblom.com/writing/flushsync',
];

// Function to dynamically format the newsletter
function formatNewsletterMarkdown(articles : Summary[]) {
    let newsletter = 'Newsletter\n\n';
    newsletter += "Hello everyone! Here are the latest news!\n\n";

    articles.forEach(article => {
        const title = article.title || "Title not available";
        const author = article.author || "Unknown author";
        const summary = article.summary || "Summary not available.";
        const link = article.link || "#";

        // Dynamic formatting for each article
        newsletter += `### ${title}\n`;
        newsletter += `*by ${author}*\n`;
        newsletter += `🔗 [Read the full article](${link})\n\n`;
        newsletter += `> ${summary}\n\n`;
    });

    newsletter += "\nThat's all for now! See you soon for more news!\n";
    return newsletter;
}

export function formatNewsletterHtml(articles: Summary[]) {
    let htmlNewsletter = '<div style="font-family: Arial, sans-serif;">';
    htmlNewsletter += '<h1>Newsletter</h1>';
    htmlNewsletter += '<p>Hello everyone! Here are the latest news!</p>';

    articles.forEach(article => {
        const title = article.title || "Title not available";
        const author = article.author || "Unknown author";
        const summary = article.summary || "Summary not available.";
        const link = article.link || "#";

        // Dynamic formatting for each article in HTML
        htmlNewsletter += '<h3>' + title + '</h3>' +
            '<p><strong>by ' + author + '</strong></p>' +  
            '<p><a href="' + link + '">Read the full article</a></p>' +
            '<blockquote>' + summary + '</blockquote>';
    });
    return htmlNewsletter;
}

export function curateAndGenerateNewsletter(): Promise<string> {
    return curate({
        links,
        interests: ['react', 'ai'],
        max: 5,
    }).then((curatedLinks: Summary[]) => {
        // Generate the formatted string
        const markdown = formatNewsletterMarkdown(curatedLinks);
        const html = formatNewsletterHtml(curatedLinks);

        // Return both formats as an object
        return { curatedLinks, markdown, html };
    }).catch((err: unknown) => {
        if (err instanceof Error) {
            console.error("Error during link curation: ", err.message);
        } else {
            console.error("Unknown error occurred during link curation");
        }
        return "Failed to generate newsletter.";
    });
}