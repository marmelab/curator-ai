#!make
include .env.local
export $(shell sed 's/=.*//' .env.local)

.PHONY        : help install cp-env build-cli build-core build CLI
.DEFAULT_GOAL = help

help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z0-9\./_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

install: ## Install the dependencies
	yarn install

cp-env: ## Copy the .env file to .env.local
	cp .env .env.local

build-cli: ## Build the CLI
	yarn workspace @ai-powered-reader/cli build

build-core: ## Build the Core
	yarn workspace @ai-powered-reader/core build

build: build-core build-cli

CLI: ## Sum up a list of articles
	@echo "Running:"
	@$(eval c ?=)
	node packages/cli/dist/index.js $(c)