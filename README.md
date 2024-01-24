# AI-POWERED-READER

Summarize a list of article with the power of AI (OpenAI Api).

## Prerequisites
- NodeJS 20
- tsc
- an OpenAI Api key

## Install
Run the following:
```shell
make install
make cp-env
make build
```

Set your OpenAI Api key in `.env.local`.

## Sumup them all
### CLI tool
With a list of links:
```shell
make CLI c="sumup-list https://example.com/article1 https://example.com/article2 --max 10"
```

With a file:
```shell
make CLI c="sumup-list-in-file myFile.json --max 10"
```

The file should be shape as follows:
```json
[
  "https://example.com/article1",
  "https://example.com/article2"
]
```