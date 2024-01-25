# AI-POWERED-READER

An AI-powered curator. It reads a list of articles, selects the best ones depending on a list of interests, and summarizes them into an easy-to-read news feed. Powered by the OpenAI API.

## Prerequisites

- Node.js > 18
- an OpenAI API key

## Install

Run the following:

```sh
npm install
```

## Usage

Summarize a list of articles based on URLs passed as parameters:

```sh
OPENAI_API_KEY=XXX npm start https://example.com/article1 https://example.com/article2 --max 10
```

Summarize a list of articles based on a file:

```sh
OPENAI_API_KEY=XXX npm start myFile.json --max 10
```

The file should be an array of URLs:

```json
[
  "https://example.com/article1",
  "https://example.com/article2"
]
```

Instead of passing the API key as an environment variable, you can also put it in a `.env` file.