#!/bin/bash
if [[ "$1" == "--force-recreate" ]]; then
  FORCE_RECREATE=$1
  DETACHED=-d
elif [[ $# -gt 1 ]]; then
  DETACHED='-d ${1:-"api-test-api apidb-test-api"}'
else
  DETACHED="-d api-test-api apidb-test-api"
fi

if [ "$FILE" != "not-set" ]; then
  PYTEST_ARGS=$FILE
else
  PYTEST_ARGS=''
fi

docker-compose -f docker-compose.test-api.yml up $FORCE_RECREATE $DETACHED
docker exec $APP_NAME-api-test-api bash -c "cd /opt/api && PYTHONPATH=. python scripts/check.py;"
docker exec $APP_NAME-api-test-api bash -c "cd /opt/api && rm -rf static/object_store_data/thumbs/* && PYTHONPATH=. pytest --color=yes -rsx -v tests/$PYTEST_ARGS;"
