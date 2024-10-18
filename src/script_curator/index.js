const { curate } = require('curator-ai');

const links = [
    'https://stability.ai/news/stable-code-2024-llm-code-completion-release',
    'https://www.fromjason.xyz/p/notebook/where-have-all-the-websites-gone/',
    'https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/',
    'https://biomejs.dev/blog/biome-v1-5/',
    'https://birtles.blog/2024/01/06/weird-things-engineers-believe-about-development/',
    'https://julesblom.com/writing/flushsync',
];

curate({
    links,
    interests: ['react', 'ai'],
    max: 5,
}).then((curatedLinks) => {
    console.log(curatedLinks);
});

// [
//  {
//    title: 'More Than You Need to Know About ReactDOM.flushSync',
//    author: 'Jules Blom',
//    summary: 'This article dives into the rarely used ReactDOM.flushSync function in React and explains what it does and when it is useful. It discusses how flushSync flushes state updates synchronously to the DOM, and why this is important. The article also explains the concept of batching in React updates and how flushSync can bypass the update queue.',
//    relevancy_score: 8,
//    link: 'https://julesblom.com/writing/flushsync'
//  },
//  ...
// ]