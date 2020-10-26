# feedback-main

## Install
  You need first:

    docker (https://docs.docker.com/install/)
    docker-compose (https://docs.docker.com/compose/install/#install-compose)

  For the webapp development:

    yarn (https://yarnpkg.com/en/docs/install)

  Specially for macosx users:

    brew install coreutils


## Run locally
  Then, starting the api with postgres:

  ```bash
    ./fb start
  ```
  
  And starting the webapp do it like: 
  ```bash
    ./fb webapp start
  ```


## Migration

  All alembic classic commands are available like so:
  ```bash
    ./fb alembic <command>
  ```


## Deploy

  Check the repo is updated with the last **master**. Then:

  ```bash
    ./fb -t I.P.S. tag
  ```

  Do a `git tag` if you want to know the current tag. After having checked that the ci worked, as an example:

  ```bash
    ./fb -e staging -t 3.0.1 deploy
  ```
