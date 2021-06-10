docker build . -t stevenimle/wedding-frontend:latest -t harbor.imle.io/library/wedding-frontend:latest || exit 1
docker push stevenimle/wedding-frontend:latest || exit 2
docker push harbor.imle.io/library/wedding-frontend:latest || exit 2
