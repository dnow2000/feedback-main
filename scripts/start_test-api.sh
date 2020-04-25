CONTAINER_NAMES=${2:-"api-test-api apidb-test-api"}
PYTEST_ARGS=$1

echo $PYTEST_ARGS

docker-compose -f docker-compose.test-api.yml up -d $CONTAINER_NAMES
docker exec $APP_NAME-api-test-api bash -c "cd /opt/api && PYTHONPATH=. python scripts/check.py;"
docker exec $APP_NAME-api-test-api bash -c "cd /opt/api && rm -rf static/object_store_data/thumbs/* && PYTHONPATH=. pytest --color=yes -rsx -v tests/$PYTEST_ARGS;"
