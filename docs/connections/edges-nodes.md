# Connections, Edges & Nodes

> Goal: Iterate a connection
>
> TODO: cover the cursor concept
>
> Why do I need this? are list not enough?

The terminology of Relay can be quite overwhelming in the beginning. Relay introduces a handful of new concepts on top of GraphQL, mainly in order to manage relationships between models.

## Connections

In Relay, relations between models are called *connections*. We use models and relations to think of our data structure. However that doesn't help us a lot for when we want to investigate the context of a specific data item. That's why Relay works with *nodes* and *edges*.

## Nodes

We call a specific data item a *node*. Each node belongs to a specific model. In our case, we will work with nodes of type Pokemon.

The `viewer` object of Relay can actually be seen as a node as well. Every node that exists on our server should be reachable indirectly via the `viewer` , otherwise there's no way to query it.

## Edges

Whenever there is a relation between two specific nodes, we say that they are connected with an *edge*.

In Relay, we can traverse the data graph from one node to the other by using the `edges` non-scalar field.

The edges field contains one field `node`, that finally exposes all the fields of the real data item.

## Putting it all together

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

## Practice: Step 3

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
