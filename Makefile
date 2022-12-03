up-production:
	docker image build -t contact:v1.0.0 . && docker run --rm -p 3000:3000 --name contact -it contact:v1.0.0
down-production:
	docker stop contact