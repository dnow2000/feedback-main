# Scalingo deploy

Première étape, installer la cli scalingo :

curl -O https://cli-dl.scalingo.io/install && bash install


Ajouter votre clé ssh pour effectuer les opérations sur scalingo depuis votre terminal :

`scalingo keys-add [KEY_NAME] [PUBLIC_KEY]`

Si vous souhaitez créer une nouvelle clé :

`ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`

Mais suivez ALL OF https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/

And simple is to add in your ~/.ssh/config:

```
Host scalingo.com *.scalingo.com 185.60.151.19
    AddKeysToAgent yes
    UseKeychain yes
    IdentityFile ~/.ssh/<id_rsa>.pub
```

## Création d'un nouvel environnement sur Scalingo :

Utiliser le script `init_new_project.sh`
Example d'appel : pour créer un projet à l'URL backend-testing.sciencefeedback.co avec une base de donnée postgresql de type 1g
(https://scalingo.com/databases/postgresql) et 2 instances de backend.
La commande déploiera ensuite la branche locale de votre dépôt Github.

`./init_new_project.sh -n science-feedback-api-dev -r dev -d 1g -b 2 -u backend-testing.sciencefeedback.co -j MAILJET_API_SECRET -k MAILJET_API_KEY -e dev`

Si l'environnement que vous souhaitez déployer a besoin de stocker des objets sur un disque OVH, un dernier script devra être lancé `init_bucket_env.sh`.

`./init_bucket_env.sh -a science-feedback-backend-testing -u [OPENSTACK_USER] -p [OPENSTACK_PASSWORD] -c storage-pc-dev -t [TENANT_NAME]`



## Restauration d'un backup sur l'un des environnements Scalingo

Première étape, installer les paquets clients de postgresql :

`apt install postgresql-client-9.5`

(Les autres versions postgresql-client > 9.5 devraient fonctionner)

Le script `restore_backup.sh` permet de restaurer sur un environnement Scalingo un dump de base de données postgres.
Le dump peut-être local avec l'option `-b` ou en récupérant un backup de production sur OVH `-o`.
Exemple d'appel du script (avec récupération de la production actuelle):

`./restore_backup.sh -a science-feedback-backend-testing -d $POSTGRES_URL_STAGING -p $SCALINGO_PG_PASSWORD_STAGING -u $SCALINGO_PG_USER_STAGING -o`

## Problème avec le deploy-backend: comment tout rebooter

- scale le container à 0
- remove addon postgres
- reajoute addon postgres
- redeploy manual via github hook
- scale à 1
