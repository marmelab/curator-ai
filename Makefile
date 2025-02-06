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

init: install build migrate_supabase ## Initialize the project

install: ## Install the dependencies
	npm install

webpage: build_webpage run_webpage ## Build and run the webpage localy

build_webpage: start_supabase ## Build the webpage
	rm -rf website/.next
	npm --workspace website run build

run_webpage: ## Run the webpage localy
	npm --workspace website run start
	
send_mail: ## Send newsletter mail
	cp -n .env.sample .env
	npx ts-node curator/src/mail_agent/newsletterScript.ts
	
build: start_supabase ## Compile the project
	npm run build
	npm run format

run: ## Summarize a list of articles
	npm --workspace curator run start

dev: ## Run the CLI in development mode
	npm --workspace website run dev

conv_agent: start_supabase ## Test the conversational agent with mail
	npm --workspace conversational_agent run start

conv_agent_test: start_supabase ## Test the conversational agent
	npm --workspace conversational_agent run test

clean: stop_supabase ## To clean the project
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