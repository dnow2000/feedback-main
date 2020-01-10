# science-feedback-main

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
    ./sf install
  ```

## Deploy

En premier lieu:
 - bien vérifier qu'on a, en local, **main** à jour par rapport à **master**
 - de là on peut poser un tag `./sf -t I.P.S. tag` (pour savoir le tag précédent, il suffit de faire un `git tag` dans main)
 - réaliser le déploiement lorsque les tests de chaque mode sont bien **verts**

Par exemple pour déployer la version 3.0.1 pour l'environnement staging :
**(Attention de ne pas déployer sur la production sans concertation !)**
```bash
./sf -e staging -t 3.0.1 deploy
```

A la fin de l'opération, une fenêtre de votre navigateur s'ouvrira sur le workflow en cours.

Après avoir livré en ovh, ne pas oublier de livrer ensuite sur les environements de demo et d'integration.
