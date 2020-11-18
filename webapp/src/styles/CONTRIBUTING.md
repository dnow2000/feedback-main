# Styles

Nos règles de styles sont les suivantes:

## Règles dans les fichiers react pour appeler les classes

Au niveau des fichiers react avec des éléments portant des propriétés className, on applique le mieux possible le fait de :

  - ne pas mettre de `style={{}}` dans les composants react.

  - pour les composants qui ont un style dépendant du state, utiliser `className={classnames('class-name-constantes', { 'class-name-state-dependent' : state.isActivated })}`

  - ne pas utiliser les sucres syntaxique `mb`, `mt`, `py` directement dans react, mais les appeler en extend dans le scss. Si on a par exemple une fonction Foo React:
    ```
      Foo = () => (<div className="foo"/>)
    ```
    On définit :
    ```
      .foo {
        @extend mb1;
        background-color:$red;
      }
    ```

## Structure du dossier

Tous les fichiers css sont placés dans ce dossier `src/styles`:

  - ce dossier a la même structure que `src/components` pour ranger ces fichiers.

  - chaque nom de fichier a un underscore `_machin.scss` et l’ensemble des fichiers sont importés dans un `index.scss` au même niveau.

  - `src/styles` a 4 sous-dossiers: variables, components, global, vendors


## Sous dossier `variables`

Les couleurs sont spécialement dans `src/styles/variables/_colors.scss` avec un code suffixe permettant d’avoir un ordre des intensités par couleur: lighter<light<rien<dark<darker

Les z-index sont dans `src/styles/variables/_zindex.scss`

Pour le moment, les autres variables sont dans `src/styles/variables/_guidelines.scss`


## Sous dossier `components`

Dans `src/styles/components`, chaque composant a son fichier de style. Par exemple pour un fichier `src/components/pages/Venue.jsx` défini par :

```
const Venue = ({ withFooter }) => (
  <main className={classnames('venue', { "with-footer": withFooter })} >
     <div className="controls" />
  </main>
)
```

On a un `src/styles/components/pages/_Venue.scss` qui encapsule les classes des éléments enfants et les classes activables pour le même niveau que `#venue` de cette façon :

```
.venue {

 &.with-footer {
  @extend .fs32;
  @extend .mb2;
 }

 .controls {
  color: $blue;
 }
}
```


## Sous dossier `global`

Il comprend notamment:

  - un fichier `src/styles/global/_frame.scss` contient des règles pour les éléments html: `*, body, html, h1` etc…

  - un autre ficher `src/styles/global/_helpers.scss` qui contient des classes utilisées en extend, avec souvent une syntaxe .is-machin


## Syntaxe CSS

Some rules need to be followed, some ot them are tagged with AP (Anytime Possible) :
   - write properties in alphabetical order,
   - (AP) use rem instead of pixels anytime it is possible,
   - (AP) use rem values that are a division by 2 : ie 1rem, 0.5rem, 0.25rem, 0.125rem... are authorized but not 0.128rem,
   - let one jumped line between the extend block and the properties block,
   - let one jumped line between the properties block and the media query block,
   - (AP) use the media-query min-width, i.e. : declare by default what is should be for mobile case,
   - use the breakpoint variables in the media-query,
   - first declare the same-level class blocks (&.<className>),
   - then declare nested the child level class blocks (.<className>)
 
Like : 
```
.foo {
    @extend .bar;
      
    align-items: center;
    display: flex;
    margin-bottom: 1rem; 
  
    @media(min-width: $tablet-with-breakpoint) {
        margin-bottom: 0;
    }
    
    &.disabled {
       color: grey;
    }

    .child {
       font-size: 0.5rem;
    }

}

```


