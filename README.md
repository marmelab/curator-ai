# Curator AI

An AI-powered news curator. It reads a list of articles, selects the best ones depending on a list of interests, and summarizes them into an easy-to-read news feed. Powered by the OpenAI API.

## Requirements

- Node.js > 18
- an [OpenAI API](https://platform.openai.com/) key

## Usage

```sh
# Install the package globally
npm install -g curator-ai

# Summarize a list of articles based on a file containing URLs
OPENAI_API_KEY=XXX curate -f myFile.txt
```

Example output:

![Example output](./assets/capture.png)

More options:

```sh
# Get usage information
curate

# Summarize a list of articles based on URLs passed as parameters
OPENAI_API_KEY=XXX curate -l https://example.com/article1 https://example.com/article2

# Return at most 5 articles
OPENAI_API_KEY=XXX curate -f myFile.txt -m 5

# Return the articles about AI and React
OPENAI_API_KEY=XXX curate -f myFile.txt -i AI React
```

You can also put the API key in a `.env` file:

```txt
OPENAI_API_KEY=XXX
```

Then you don't need to pass it as a parameter.

```sh
curate -f myFile.txt
```

## Development

```sh
npm install

# Get usage information
npm start

# Summarize a list of articles based on URLs passed as parameters (notice the --):
npm start -- -l https://example.com/article1 https://example.com/article2
```

Don't forget to pass a valid OpenAI key, either as an environment variable or in a `.env` file.

## Build

```sh
npm run build
npm publish
```

## License

MIT
