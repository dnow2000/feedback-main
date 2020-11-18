# feedback-main

## Install
  You need first:

    docker (https://docs.docker.com/install/)
    docker-compose (https://docs.docker.com/compose/install/#install-compose)

  For the webapp development:

    yarn (https://yarnpkg.com/en/docs/install)

  Specially for macosx users:

    brew install coreutils


## Run
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
  
## Contributing
 
For a developer wanting to add new code, here are the steps to follow :
   - create localy a branch with a 'lower-dash-case' syntax: `git checkout -b lower-dash-case`,
   - after your first commit, push it on the remote with : `git push --set-upstream origin lower-dash-case`,
   - create a Pull Request with that branch compared to master, and add a `[WIP]` on the beginning of your pull request title,
   - if this branch is associated to a github project issue : translate the ticket in the `In Progress` column, make sure you are assigned to this ticket, add the `#113` issue number like at the beginning of the title of the pull request, and also write the `#113` number link in the beginning of the comment,
   - once you think your branch is done, remove the `[WIP]` tag, choose an assigned reviewer for the PR
   - if this branch is associated to to a github project issue : translate the ticket in the To Be Reviewed column, assign it to the person who is assigned to review,
   - wait for the reviewer to allow the merge into master (by an `Approved` label in the PR), then you can click on the `Rebase and Merge` button
   - if this branch is associated to a github project issue, do the necessary recipes in the testing environment, and if it is no bug, translate the ticket in the `Reviewed (Testing)`
