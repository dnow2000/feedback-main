# Package `repository`

Les modules de ce package contiennent des fonctions qui implémentent des _queries_ SQL Alchemy basées sur les _Models_
SQL Alchemy définis dans le package `models` ou de la lecture de variables d'environnement (l'environnement étant une
dépendance externe au système).

## Do

Ces fonctions doivent contenir uniquement des requêtes vers la base de données qui retournent soit des tuples de données
"primitives" (e.g. une liste d'adresses e-mail), soit des instances de modèles SQL Alchemy. On pourra aussi avoir des
fonctions qui retournent des "morceaux" de queries, c'est-à-dire des fonctions (privées) qui construisent des queries
qui ne sont pas déclenchées (i.e. qui n'ont pas de `.all()` ou `.first()`).
On utilisera des indications de type dans les signatures des fonctions pour indiquer quelles sont les données attendues
en entrée et en sortie.


## Don't

Ces fonctions ne doivent pas contenir :

- Des notions relatives au `routing` (e.g. _status codes_ HTTP, verbes HTTP) ;
- Des règles de gestion ;
- Des appels à des web services.

## Testing

Ces fonctions sont testées dans un contexte Flask, donc avec une connexion à la base de données. On considère que ce sont
des tests d'intégration. Ces tests déclenchent donc de vraies requêtes SQL et nécessitent que des données soient présentes
en base. Ces tests utilisent le décorateur `@clean_database` qui s'occupe de vider chaque table avant l'exécution d'un
test et insèrent les données nécessaires dans leur partie `# given`.

Ils ont pour objectif de :

- Vérifier qu'une requête fait bien ce qu'elle dit et retourne des données censées ;
- Vérifier que les requêtes gèrent bien les cas aux limites via des exceptions attendues.

## Pour en savoir plus

- http://flask-sqlalchemy.pocoo.org/2.3/queries/

## Notes on tsvector functions within keywords.py file

tsvector (text search vector) is a data type which consists of the following characteristics:

- a sorted list (alphabetically)
- normalized words to merge different variants of the same word
- duplicates of same words are removed

Reference: https://stackoverflow.com/questions/42388956/create-a-full-text-search-index-with-sqlalchemy-on-postgresql
