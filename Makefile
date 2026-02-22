.DEFAULT_GOAL := help
SHELL := /usr/bin/env bash

NPM ?= npm

.PHONY: help install dev lint build start clean outdated audit update

## Show this help message
help:
	@awk '\
	  BEGIN {FS = ":"} \
	  /^### / {section=substr($$0,5); next} \
	  /^##/ {sub(/^## ?/, "", $$0); helpMsg = $$0; next} \
	  /^[a-zA-Z0-9_.-]+:/ { \
	    sub(/:.*/, "", $$1); \
	    if (helpMsg) { \
	      if (section) { \
	        printf "\n\033[1m%s\033[0m\n", section; \
	        section = ""; \
	      } \
	      printf "  \033[36m%-20s\033[0m %s\n", $$1, helpMsg; \
	      helpMsg = ""; \
	    } \
	  }' $(MAKEFILE_LIST)

### Setup
## Install Node dependencies
install:
	$(NPM) install

### Development
## Run Next.js development server
dev:
	$(NPM) run dev

## Run lint checks
lint:
	$(NPM) run lint

## Build production assets
build:
	$(NPM) run build

## Start production server
start:
	$(NPM) run start

### Dependencies
## Show outdated packages
outdated:
	@$(NPM) outdated || true

## Run npm audit
audit:
	@$(NPM) audit

## Update packages within declared semver ranges
update:
	$(NPM) update
	$(NPM) install

### Cleanup
## Remove local build artifacts
clean:
	rm -rf .next
