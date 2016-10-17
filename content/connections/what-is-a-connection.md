# What is a Connection?

The terminology of Relay can be quite overwhelming in the beginning. Relay introduces a handful of new concepts on top of GraphQL, mainly in order to manage relationships between models or individual data items.

## Connections

In Relay, relations between models are called *connections*. We use models and relations to think of our data structure.

## Nodes

We call a specific data item a *node*. Each node belongs to a specific model. In our case, we will work with nodes of type Pokemon.

The `viewer` object of Relay can actually be seen as a node as well. Every node that exists on our server should be reachable indirectly via the `viewer`, otherwise there's no way of querying it.

## Edges

Whenever there is a relation between two models and two specific nodes are indeed related, we say that they are connected with an *edge*.

## Traversing the Data Graph

We can actually think of the `viewer` as a node in our data graph that is connected with all the different data nodes through different connections like `allPokemons` as fields on the `viewer` object - these connections consist of several edges, which we can query by selecting the `edges` field on the connection `allPokemons`. Then we can finally select which fields to query on the individual `node`.

This way we can traverse our data graph by starting at the viewer and following the edges we are interested in.

Putting it all together, we can fetch all pokemons with this query:

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

This will return a list of `edges` that all contain the `id`, `name` and `url` of every pokemon `node` in the `allPokemons` connection.

You could then map the edges like this:
`viewer.allPokemons.edges.map((edge) => edge.node).map((pokemon) => console.log(pokemon)`

Remember that in a Relay container the fragments are exposed as props inside the component.

Also note the `first: 100000` part. Having either the `first` or the `after` argument in a query like this is a requirement by Relay. For now, we are just using a huge number to be certain that we query all the Pokemons in our Pokedex.

## Exercise 03: Show existing Pokemons in ListPage

> To start with this exercise, checkout the according branch and insert your endpoint in `package.json` and `index.js` in the pokedex application:

```sh
git checkout step-03
# copy and paste your endpoint to `package.json` and index.js
npm install
npm start
# Open localhost:3000
```

Back to the Pokemon app.

Right now it doesn't do too much... let's change that!
In the previous step, we have seen the `ListPage` component, but it isn't containing anything yet. It would be nice to have a preview component for every Pokemon in our Pokedex that switches to a detailed view whenever we click on it.

In `step-03`, we have already set you up with the basic foundations of the new component `PokemonPreview`.

The Relay container for `PokemonPreview` which we have also prepared for you looks like that:

```javascript
export default Relay.createContainer(
  PokemonPreview,
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


For step 03, you should complete the following tasks:

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

* In `ListPage` we currently show `There are 28 Pokemons in your pokedex`. You should display the correct amount here.

> Remember that inside the `ListPage` component, we will have access to `viewer` that contains the `allPokemons` object which in turn contains the `edges` array.

* Actually display all the Pokemons by mapping over `this.props.viewer.allPokemons.edges`. Use the `PokemonPreview` container and fill the props `key` and `pokemon` with the `node` field of each edge.
