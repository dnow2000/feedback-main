#!/bin/bash
scalingo --app $APP_NAME-api-$ENV --region $REGION env-set ENV=$ENV
scalingo --app $APP_NAME-api-$ENV --region $REGION env-set POSTGRES_URL="$SCALINGO_POSTGRESQL_URL"
scalingo --app $APP_NAME-api-$ENV --region $REGION env-set UNICORN_N_WORKERS=5
scalingo --app $APP_NAME-api-$ENV --region $REGION env-set UNICORN_TIMEOUT=90
