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
function formatNewsletter(articles) {
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

curate({
    links,
    interests: ['react', 'ai'],
    max: 5,
}).then((curatedLinks) => {
    // Generate the formatted string
    const newsletterText = formatNewsletter(curatedLinks);

    // Display the newsletter in the console
    console.log(newsletterText);
}).catch(err => {
    console.error("Error during link curation: ", err);
});
