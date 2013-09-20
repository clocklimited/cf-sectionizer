qa: test lint

test:
	@./node_modules/.bin/mocha -r should -R spec

lint:
	@./node_modules/.bin/jshint .

.PHONY: test lint lint-changed
