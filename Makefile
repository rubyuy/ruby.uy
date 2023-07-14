default: build

server:
	@bundle exec jekyll s --incremental

build:
	@bundle exec jekyll b
