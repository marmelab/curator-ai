#!make

.PHONY        : help install build-cli build-core build CLI
.DEFAULT_GOAL = help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

init: ## Initialize the project
	make install
	make build

install: ## Install the dependencies
	npm install

webpage: ## Run the webpage localy
	cd website && npm run start
	
send_mail: ## Send newsletter mail
	cp -n .env.sample .env
	npx ts-node curator/src/mail_agent/newsletter_script.ts
	
build: ## Compile the project
	npm run build
	npm run format

run: ## Summarize a list of articles
	cd curator && npm start

dev: ## Run the CLI in development mode
	cd website && npm run dev

conv_agent: ## Test the conversational agent
	cd conversational_agent && npm run start

clean: ## To clean the project
	rm -f package-lock.json
	rm -rf node_modules
