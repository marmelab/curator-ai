#!make

.PHONY        : help install build-cli build-core build CLI
.DEFAULT_GOAL = help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

init: ## Initialize the project
	make install
	cp -i .env.production .env

webpage: ## Run the webpage locally
	npx ts-node src/web/server.ts

testMail: ## Test a sample mail
	ts-node ./src/script_curator/newsletter_script.ts

install: ## Install the dependencies
	npm install

build: ## Compile the project
	npm build

run: ## Summarize a list of articles
	npm start