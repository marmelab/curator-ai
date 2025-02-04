#!make
SHELL := /bin/bash
# Load .env file
ifneq (,$(wildcard .env))
    include .env
    export
endif

.PHONY        : help install build-cli build-core build CLI
.DEFAULT_GOAL = help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

init: ## Initialize the project
	make install
	make build
	make migrate_supabase

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
	make start_supabase

run: ## Summarize a list of articles
	npm --workspace curator run start

dev: ## Run the CLI in development mode
	npm --workspace website run dev

conv_agent: ## Test the conversational agent with mail
	make start_supabase
	npm --workspace conversational_agent run start

conv_agent_test: ## Test the conversational agent
	make start_supabase
	npm --workspace conversational_agent run test

clean: ## To clean the project
	make stop_supabase
	rm -rf node_modules

# Start ngrok on a specific port
start_ngrok:
	npx ngrok config add-authtoken $(NGROK_AUTH_TOKEN)
	@echo "Starting ngrok on port 3001"
	npx ngrok http 3001

migrate_supabase:
	npx supabase db reset

start_supabase:
	npx supabase start -x vector

stop_supabase:
	npx supabase stop