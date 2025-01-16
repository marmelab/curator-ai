# Curator AI

[![Common Changelog](https://common-changelog.org/badge.svg)](https://common-changelog.org)

An AI-powered news curator. It reads a list of articles, selects the best ones depending on a list of interests, and summarizes them into an easy-to-read news feed. Powered by the OpenAI API.

## Requirements

- Node.js >= 18
- an [OpenAI API](https://platform.openai.com/) key
- a [Postmark](https://postmarkapp.com/) server

## Initialize the project

After cloning the repository, run the following command :

```sh
make init
```

It will install every dependencies.

Then you can copy the `.env.sample` file as `.env`, and fill it with your info:

- `OPENAI_API_KEY`: your Open API key.
- `SUPABASE_URL`: the url of your Supabase DB.
- `SUPABASE_ANON_KEY`: the anon key of your Supabase BD.
- `POSTMARK_API_KEY`: your Postmark API key.
- `DEFAULT_POSTMARK_MAIL`: the default email you are using to communicate with the service.
- `NGROK_AUTH_TOKEN`: your Ngrok auth token.

## Start the webpage

To run the webpage localy:

```sh
make webpage
```

To start Next in dev mode:

```sh
make dev
```

## The conversational Agent

## Test the interest scrapper (without the mail)

```sh
make conv_agent_test
```

This will return your preferences in a JSON format. If you want to see and change the request, go to the `./conversational_agent/src/test/myMessage.txt`.

## Send an email an get your extracted preferences !

```sh
make conv_agent
```

This will start the server at `http://localhost:3000`.
Now, in an other terminal :

```sh
make start_ngrok
```

This, will show a bunch of line. Note the one like :

```sh
Forwarding                    <YOUR_WEBHOOK_URI> -> http://localhost:3000
```

Go to your [Postmark](https://postmarkapp.com/) server, and :

- Create an Inbound Message Stream if not already existing.
- In the settings of this Inbound Stream, write `<YOUR_WEBHOOK_URI>/webhook` in the Webhook section.
- Be sure that the email you have entered in the `.env` file as `DEFAULT_POSTMARK_MAIL` is in `Sender Signatures`. This will be the email you are going to use after.

Now you can send an email to the inbound address (in the inbound settings).
This will return a list of preferences.

## CLI Usage

```sh
# Install the package globally
npm install -g curator-ai

# Summarize a list of articles based on aggregator URLs
OPENAI_API_KEY=XXX curate -a https://news.ycombinator.com/ https://lobste.rs/
```

Example output:

![Example output](./assets/capture.png)

More options:

```sh
# Get usage information
curate

# Summarize a list of articles based on URLs passed directly as parameters
OPENAI_API_KEY=XXX curate -u https://example.com/article1 https://example.com/article2

# Summarize a list of articles based on a file containing URLs
OPENAI_API_KEY=XXX curate -uf myFile.txt

# Return at most 5 articles
OPENAI_API_KEY=XXX curate -a https://news.ycombinator.com/ -m 5

# Return the articles about AI and React
OPENAI_API_KEY=XXX curate -a https://news.ycombinator.com/ -i AI React

# Summarize a list of articles based on RSS feed
OPENAI_API_KEY=XXX curate -r https://afup.org/rss.xml -i event
```

You can also put the API key in a `.env` file:

```txt
OPENAI_API_KEY=XXX
```

Then you don't need to pass it as a parameter.

```sh
curate -f myFile.txt
```

## Programmatic Usage

```sh
# Install the package locally
npm install curator-ai
```

Put the API key in a `.env` file:

```txt
OPENAI_API_KEY=XXX
```

Use the `curate` function:

```js
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
}).then(curatedLinks => {
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
```

## Development

```sh
npm install

# Get usage information
npm start

# Summarize a list of articles based on aggregator URLs (notice the --):
npm start -- -a https://news.ycombinator.com/
```

Don't forget to pass a valid OpenAI key, either as an environment variable or in a `.env` file.

## Build

```sh
npm run build
npm publish
```

## License

MIT
