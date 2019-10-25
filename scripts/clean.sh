MODE=$1
TARGET=$2

docker-compose -f docker-compose.$MODE.yml up -d api-$MODE postgres-$MODE
docker exec $APP_NAME-api-$MODE bash -c "cd /opt/api && PYTHONPATH=. python scripts/check.py;"
docker exec $APP_NAME-api-$MODE bash -c "cd /opt/api && rm -rf static/object_store_data/thumbs/* && PYTHONPATH=. python scripts/manager.py clean -t $TARGET;"
