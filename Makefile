.DEFAULT_GOAL := help
SHELL := /usr/bin/env bash

PNPM := pnpm

.PHONY: help install dev lint build start clean outdated audit update

## Show the help message
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
	$(PNPM) install

### Development
## Run Next.js development server
dev:
	$(PNPM) dev

## Run lint checks
lint:
	$(PNPM) run lint

## Run prettier format
format:
	$(PNPM) run format

## Build production assets
build:
	$(PNPM) build

## Start production server
start:
	$(PNPM) start

### Dependencies
## Show outdated packages
outdated:
	@$(PNPM) outdated || true

## Run npm audit
audit:
	@$(PNPM) audit

## Update packages within declared semver ranges
update:
	$(PNPM) update
	$(PNPM) install

### Cleanup
## Remove local build artifacts
clean:
	rm -rf .next
