# Working with Fragments

We use fragments in two different ways:

* A container defines **its own data requirements** by creating a list of fragments.
* A container can use fragments **defined elsewhere by other containers** when creating its own fragments. This is typically used for a parent to set the props of a child without exactly knowing all the selected fields the child defined in the fragment.

## Declare data requirements

If your component depends on a `pokemon` node, you can define a fragment `pokemon` with this code:

```javascript
export default Relay.createContainer(
  withRouter(PokemonPreview),
  {
    fragments: {
      pokemon: () => Relay.QL`
        fragment on Pokemon {
          id
          name
          url
        }
      `,
    },
  }
)
```

`Pokemon` in `fragment on Pokemon` is the model name defined by the GraphQL server. In our case, the GraphQL server exposes the `Pokemon` model, so we're good.

`pokemon` in `pokemon: () => Relay.QL` is the name of the fragment and can be chosen by the container. `pokemon` will be exposed as a prop to the inner `Component`. It contains the subfields `id`, `name` and `url`.

## Use other containers' fragments

To use the fragment `pokemon` in another container, you can use this code:

```javascript
export default Relay.createContainer(
  withRouter(ListPage),
  {
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          allPokemons (first: 100000) {
            edges {
              node {
                ${PokemonPreview.getFragment('pokemon')}
                id
              }
            }
          }
          id
        }
      `,
    },
  },
)
```

By using `${PokemonPreview.getFragment('pokemon')}` we refer to the fragment `pokemon` of the `PokemonPreview` container, selecting `id`, `name` and `url`. This way, we can fetch all data that is needed for the `PokemonPreview` component, without exactly knowing which data that is in the parent component `ListPage`. Additionally to the fragment, we select the `id` field explicitely, even though it is already contained in the `pokemon` fragment from the `PokemonPreview` component.
That is because `ListPage` depends on the `id` field itself and we can't rely on the fact that `id` is already contained in the `pokemon` fragment.

This mechanism is called data masking. 

## Data masking

The concept of stating the data requirements inside the individual containers is called data masking: a powerful concept that leads to better encapsulation and reduces the appearance of subtle errors.

> Data is only exposed to containers that explicitely stated a dependency on that data. If a child depends on certain data, its parent does not know about it and vice versa.

This helps to prevent satisfying data requirements *by luck*, for example when a parent container forgot to state his own data requirement but it is luckily satisfied by a child. If at some point in time the child does not depend on this data any more and the data requirement is removed, we would encounter subtle errors.
