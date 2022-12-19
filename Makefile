APPNAME=luisfelipe998/wallet-backup

docker-build:
	docker build -t ${APPNAME} .

docker-push: docker-build
	docker push ${APPNAME}

run:
	npm start