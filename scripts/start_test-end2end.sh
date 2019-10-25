CONTAINER_NAMES=${1:-"api-test-end2end frontend-test-end2end geoserver-test-end2end postgres-test-end2end"}

docker-compose -f docker-compose.test-end2end.yml up -d $CONTAINER_NAMES
docker exec $APP_NAME-api-test-end2end bash -c "cd /opt/api && PYTHONPATH=. python scripts/check.py;"
docker exec $APP_NAME-frontend-test-end2end bash -c "source ~/.profile && cd /opt/frontend && yarn test:end2end;"
