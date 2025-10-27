DC = docker compose
DC_TEST = $(DC) -f compose.test.yml

.PHONY: build up down web-bash init test-build test-up test-down test-web-bash

build:
	$(DC) build
up:
	$(DC) up -d

down:
	$(DC) down

web-bash:
	$(DC) exec web bash

init:
	$(DC) exec web rails db:create
	$(DC) exec web rails db:migrate
	$(DC) exec web rails db:seed

test-build:
	$(DC_TEST) build

test-up:
	$(DC_TEST) up -d

test-down:
	$(DC_TEST) down

test-web-bash:
	$(DC_TEST) exec test-web bash
