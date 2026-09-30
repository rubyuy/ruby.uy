default: build

server:
	@bundle exec jekyll s --incremental --host 0.0.0.0

build:
	@bundle exec jekyll b
