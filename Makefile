run:
	# run on localhost and on network so that it's available to other devices
	gatsby develop -H 0.0.0.0

build:
	@gatsby build

codegen:
	# generate types for graphql
	@npm run codegen