# Putting it all together

Put it together chap!

## Traverse the data graph in a query

A query to fetch all Pokemons could look like this:

```graphql
query {
  viewer {
    allPokemons (first: 100000) {
      edges {
        node {
          id
          name
          url
        }
      }
    }
  }
}
```

This will return a list of `edge`s that all contain a `node`.

You could then map the edges like this:
`viewer.allPokemons.edges.map((edge) => edge.node).map((pokemon) => console.log(pokemon)`

Remember that in a Relay container, the fragments are exposed as props inside the component.

Also note the `first: 100000` part. Having the `first` argument in a query like this is a requirement by Relay. For now, we are just using a huge number to be certain that we query all the Pokemons in our pokedex.

## Step 3: Show existing Pokemons in ListPage

Back to the Pokemon app.

Right now it doesn't do too much... let's change that!
In the previous step, we have seen the `ListPage` component, but it isn't containing anything yet. It would be nice to have a preview component for every Pokemon in our Pokedex that switches to a detailed view whenever we click on it.

In `step-3`, we already set you up with the basic foundations of the new component `PokemonPreview`.

The Relay container for `PokemonPreview` which we also prepared for you looks like that:

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

As you can see, a fragment `pokemon` is defined that contains all the fields of the `Pokemon` model that the `PokemonPreview` depends on.

Remember that we can use this fragment in another component by calling `PokemonPreview.getFragment('pokemon')` or `${PokemonPreview.getFragment('pokemon')}` inside a query.



For step 3, you should

* Change the query of `ListPage` by replacing the `id` field of the `viewer` with this query:

```graphql
allPokemons (first: 100000) {
  edges {
    node {
      id
      ${PokemonPreview.getFragment('pokemon')}
    }
  }
}
```

* Currently in `ListPage` we show `There are 28 Pokemons in your pokedex`. You should display the correct amount here.

* Actually display all the Pokemons by mapping over `this.props.viewer.allPokemons.edges` and fill the props `key` and `pokemon` with the `node` field of each edge.

## Further reading

* [Relay docs on connections](https://facebook.github.io/relay/docs/graphql-connections.html)
* [Relay Cursor Connections Specification](https://facebook.github.io/relay/graphql/connections.htm).
