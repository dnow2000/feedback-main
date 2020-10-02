CONTAINER_NAMES=${1:-"apidb-test-end2end api-test-end2end webapp-test-end2end nginx-test-end2end"}

docker-compose -f docker-compose.test-end2end.yml up -d $CONTAINER_NAMES
docker exec $APP_NAME-api-test-end2end bash -c "cd /opt/api && PYTHONPATH=. python scripts/check.py;"
docker exec $APP_NAME-api-test-api bash -c "cd /opt/api && PYTHONPATH=. alembic upgrade head;"
docker exec $APP_NAME-api-test-end2end bash -c "cd /opt/api && PYTHONPATH=. python scripts/manager.py sandbox --name=ci;"
docker exec $APP_NAME-webapp-test-end2end bash -c "source ~/.profile && cd /opt/webapp && yarn test:end2end;"
