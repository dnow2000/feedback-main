# Package `routes`
Les modules de ce package contiennent des fonctions python de type _controller_ ainsi que le _binding_ de ces fonctions
avec les routes d'API grâce au _framework Flask_.

## Do
Ces fonctions doivent contenir : des appels à des fontions de `domain`, ou `repository` ainsi que les différents _HTTP status codes_ que l'ont souhaite retourner.

## Don't
Ces fonctions ne doivent pas contenir : des règles de gestion, des _queries_ vers la base de données ou des appels à des
web services.

## Testing
Ces fonctions sont testées au travers des routes, avec des tests fonctionnels. Ces tests utilisent des appels HTTP et
se positionnent donc "du point de vue du client".

Ils ont pour objectif de :
* documenter les différents status codes qui existent pour chaque route
* documenter le JSON attendu en entrée pour chaque route
* documenter le JSON attendu en sortie pour chaque route
* détecter les régressions sur les routes d'API

Ils n'ont pas pour objectifs de :
* tester l'intégralité des cas passants ou non-passants possibles. Ces cas là seront testés plus près du code, dans des
modules de `domain` ou de `repository` par exemple.


## Pour en savoir plus
* http://flask.pocoo.org/docs/1.0/quickstart/#routing
