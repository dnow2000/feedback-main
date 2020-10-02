#!/bin/bash

if [[ "$1" == "--force-recreate" ]]; then
  FORCE_RECREATE=$1
  DETACHED=-d
  PYTEST_ARGS=$2
elif [[ $# -gt 1 ]]; then
  DETACHED='-d ${1:-"api-test-api apidb-test-api"}'
  PYTEST_ARGS=$2
else
  DETACHED="-d api-test-api apidb-test-api"
  PYTEST_ARGS=$1
fi


#docker-compose -f docker-compose.test-api.yml stop
#sudo rm -rf docker_data_test_api/apidb
docker-compose -f docker-compose.test-api.yml up $FORCE_RECREATE $DETACHED

docker exec $APP_NAME-api-test-api bash -c "cd /opt/api && PYTHONPATH=. python scripts/check.py;"
#docker-compose -f docker-compose.test-api.yml


#docker exec $APP_NAME-api-test-api bash -c "cd /opt/api && PYTHONPATH=. python scripts/check.py;"
#docker exec $APP_NAME-api-test-api bash -c "cd /opt/api && rm -rf static/object_store_data/thumbs/* && PYTHONPATH=. pytest --color=yes -rsx -v tests/$PYTEST_ARGS;"
