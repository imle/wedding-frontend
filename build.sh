docker build . -t stevenimle/wedding-frontend:latest -t stevenimle/wedding-frontend:0.1.0 || exit 1
docker push stevenimle/wedding-frontend:latest || exit 2
docker push stevenimle/wedding-frontend:0.1.0 || exit 2
