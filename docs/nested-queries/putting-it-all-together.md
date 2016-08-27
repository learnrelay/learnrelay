# Putting it all together

We are now ready to fully understand a complete GraphQL with Relay!
Queries in Relay are *hierarchical*, and once we understood the concept of nodes and edges, we also have a better understanding of the structure a query has.

## Traverse the data graph

We can actually think of the `viewer` as a node in our data graph that is connected with all the different data nodes.
That's why we have different connections like `allPokemons` as fields on the `viewer` object - these connections consist of several edges, which we can query by selecting the `edges` field on the connection `allPokemons`. Then we can finally select fields on the individual `node`.

Like this, we can traverse our data graph by starting at the viewer, and just follow edges that we are interested in.

Putting it all together like this, we can fetch all pokemons with this query:

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


For step 3, you should

* Change the query of `ListPage` by replacing the `id` field of the `viewer` with this query:

```graphql
allPokemons (first: 100000) {
  edges {
    node {
      ${PokemonPreview.getFragment('pokemon')}
      id
    }
  }
}
```

* Currently in `ListPage` we show `There are 28 Pokemons in your pokedex`. You should display the correct amount here.

> Remember that inside the `ListPage` component, we will have access to `viewer` that contains the `allPokemons` object which in turn contains the `edges` array.

* Actually display all the Pokemons by mapping over `this.props.viewer.allPokemons.edges` and fill the props `key` and `pokemon` with the `node` field of each edge.
