# feedback-main

## Install
  You need first:

    docker (https://docs.docker.com/install/)
    docker-compose (https://docs.docker.com/compose/install/#install-compose)

  For the webapp development:

    yarn (https://yarnpkg.com/en/docs/install)

  Specially for macosx users:

    brew install coreutils

  Then for everybody:

  ```bash
    ./fb start
  ```


## Migration

  For a new revision:
  ```bash
    ./fb alembic revision
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

### first deploy
  In development mode, create the init_schema.sql that will be the first revision in your scalingo alembic stacks:

  ```bash
    ./fb create-init-schema;
    git commit -m "created init_schema.sql";
    git push
  ```
