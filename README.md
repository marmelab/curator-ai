# AI-POWERED-READER

An AI-powered curator. It reads a list of articles, selects the best ones depending on a list of interests, and summarizes them into an easy-to-read news feed. Powered by the OpenAI API.

## Prerequisites

- Node.js > 18
- an OpenAI API key

## Usage

```sh
# Install the package globally
npm install -g curator-ai

# Get usage information
curate

# Summarize a list of articles based on URLs passed as parameters:
OPENAI_API_KEY=XXX curate -- -l https://example.com/article1 https://example.com/article2
```

You can also put the API key in a `.env` file:

```
OPENAI_API_KEY=XXX
```

## Development

```sh
npm install

# Get usage information
npm start

# Summarize a list of articles based on URLs passed as parameters:
npm start -- -l https://example.com/article1 https://example.com/article2

#Summarize a list of articles based on a file:
npm start -- -f myFile.json

#Return at most 5 articles:
npm start -- -f myFile.json -m 5

#Return the articles about AI and React:
npm start -- -f myFile.json -i AI React
```

Don't forget to pass a valid ApoenAI key, either as an environment variable or in a `.env` file.

## Build

```sh
npm run build
npm publish
```