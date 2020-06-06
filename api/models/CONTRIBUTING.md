# Package `models`

Les modules de ce package contiennent principalement des classes qui implémentent le modèle de données relationnel du backend. Ces classes peuvent représenter :

- des tables SQL (héritage depuis `ApiHandler` et `Model`) ;
- des colonnes de tables SQL (on parle alors de classe `*Mixin`).

Ce système repose entièrement sur l'ORM SQL `Alchemy`.

## Do

Les modifications apportées au modèle de données doivent impérativement et systématiquement être scriptées dans une
migration de schéma relationnel avec `Alembic`. Les deux modifications (classes d'ORM et migration `Alembic`)
doivent être mergée simultanément dans la branche master.
Il est impératif d'être ISO entre une classe ORM et la révision `Alembic` car la production ne joue que les révisions
`Alembic` et ne s'occupe pas des `Model`.
Il est important de savoir qu'une clé étrangère n'est pas un index par défaut en `Postgres`, il faut donc
le rajouter en fonction de votre contexte.

Donc quand on a :

```python
fooId = Column(BigInteger,
    ForeignKey('foo.id'),
    index=True)
```

Il faut dans la révision `Alembic` :

```python
ALTER TABLE ONLY bar_foo ADD CONSTRAINT "bar_foo_fooId_fkey" FOREIGN KEY ("fooId") REFERENCES foo(id);
CREATE INDEX "idx_bar_foo_fooId" ON offer_foo ("fooId");
```

## Testing

Les classes présentes dans ce package ne sont pas testables puisque composées, dans leur forme la plus simple, uniquement
de déclaration de champs. Toutefois, si on souhaite leur donner des comportements ou de la logique (e.g. via des méthodes
d'instance ou des _properties_) il est possible de les tester unitairement.


## Pour en savoir plus

- https://fr.wikipedia.org/wiki/Mapping_objet-relationnel
- https://www.sqlalchemy.org/features.html
- https://alembic.sqlalchemy.org/en/latest/index.html
