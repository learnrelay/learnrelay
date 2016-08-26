# Working with Fragments

We use fragments in two different ways:

* A container defines **its own data requirements** by creating a list of fragments. To define a different fragment `pokemon`, you can use this code:

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

The `Pokemon` in `fragment on Pokemon` is the model name defined by the GraphQL server. In our case, the GraphQL server exposes the `Pokemon` model, so we're good.

The name `pokemon` of the fragment is a choice of the container. `pokemon` will be exposed as a prop to the inner `Component`. It contains the subfields `id`, `name` and `url`.

* A container can use fragments **defined elsewhere by other container** when creating its own fragments. This is typically used to set the props of a child without exactly knowing all the selected fields the child defined in the fragment.

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
                name
                url
              }
            }
          }
        }
      `,
    },
  },
)
```

By using `${PokemonPreview.getFragment('pokemon')}` we refer to the fragment `pokemon` of the `PokemonPreview` container.
Then we define a subselection on this fragment. In this case we select the fields `id`, `name` and `url`.

The concept of encapsulating the data requirements inside the individual containers is called data masking. You can explore the reasons why Relay chooses to use [data masking](data-masking.md) but it is not a requirement for the Pokemon app.
