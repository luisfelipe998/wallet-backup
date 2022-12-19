APPNAME=luisfelipe998/wallet-backup

docker-build:
	docker build -t ${APPNAME} .

docker-push: docker-build
	docker push ${APPNAME}

# you wil most likely need to inject the environment variables through the -e or --env-file flag. See README for more information.
run: docker-build
	docker run --env-file ./.env ${APPNAME} 