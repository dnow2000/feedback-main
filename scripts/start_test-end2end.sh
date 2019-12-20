CONTAINER_NAMES=${1:-"api-test-end2end webapp-test-end2end nginx-test-end2end postgres-test-end2end"}

#export API_URL=http://nginx-test-end2end

docker-compose -f docker-compose.test-end2end.yml up -d $CONTAINER_NAMES
docker exec $APP_NAME-api-test-end2end bash -c "cd /opt/api && PYTHONPATH=. python scripts/check.py;"
docker exec $APP_NAME-api-test-end2end bash -c "cd /opt/api && PYTHONPATH=. python scripts/manager.py sandbox --name=ci;"
#docker exec $APP_NAME-webapp-test-end2end bash -c "ping http://nginx-test-end2end:80/health;"
docker exec $APP_NAME-webapp-test-end2end bash -c "source ~/.profile && cd /opt/webapp && yarn test:end2end;"
