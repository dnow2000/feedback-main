#!/bin/bash

set -o allexport
[[ -f .env ]] && source $ROOT_PATH/.env
set +o allexport

for ENV in staging production
  export ENV=$ENV && \
    ./scripts/scalingo/install_env_variables.sh
do
