#!make

.PHONY        : help install build-cli build-core build CLI
.DEFAULT_GOAL = help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

init: ## Initialize the project
	make install

install: ## Install the dependencies
	cd curator && npm install
	cd website && npm install

webpage: ## Run the webpage localy
	npx ts-node ./website/src/server.ts

build: ## Compile the project
	cd curator && npm build

run: ## Summarize a list of articles
	cd curator && npm start
