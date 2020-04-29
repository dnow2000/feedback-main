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


## Restauration d'un backup sur l'un des environnements Scalingo

Première étape, installer les paquets clients de postgresql :

`apt install postgresql-client-9.5`

(Les autres versions postgresql-client > 9.5 devraient fonctionner)

Le script `restore_backup.sh` permet de restaurer sur un environnement Scalingo un dump de base de données postgres.
Le dump peut-être local avec l'option `-b` ou en récupérant un backup de production sur OVH `-o`.
Exemple d'appel du script (avec récupération de la production actuelle):

`./restore_backup.sh -a $APP_NAME-api-testing -d $POSTGRES_URL_STAGING -p $SCALINGO_PG_PASSWORD_STAGING -u $SCALINGO_PG_USER_STAGING -o`

## Problème avec le deploy-backend: comment tout rebooter

- scale le container à 0
- remove addon postgres
- reajoute addon postgres
- redeploy manual via github hook
- scale à 1
