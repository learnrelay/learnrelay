# Variables

Often we may want to use queries that are identical on a structural level, but differ in some semantic detail.
Imagine, for example, that the number of Pokemons that we want to fetch depends on some external switch.

Using *query variables* in this situation can increase code quality and performance, as string building is a quite costly operation.

We will see query variables in action soon. For now, try to understand the following examples!

## Initial variables

To use query variables, we can set `initialVariables` when we create a container.
Remember the query from the previous section?

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
We don't understand it completely yet, but don't worry, we'll get there in the next chapter! For now, take the query as it is.
We can use the `orderBy` argument exposed by the GraphQL server to sort the Pokemons by their id:

```javascript
export default Relay.createContainer(
  withRouter(ListPage),
  {
    initialVariables: {
      sortOrder: 'id_DESC'
    },
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          allPokemons (first: 100000, orderBy: $sortOrder) {
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

## Set variables

Components have control over query variables, by using `setVariables`. To change the sort order, we could call this method:

```javascript
_sortByName() {
  this.props.relay.setVariables({
    sortOrder: this.props.relay.variables.sortOrder === 'name_ASC' ? 'name_DESC' : 'name_ASC'
  })
}
```

After calling `setVariable`, it takes some time until the changed variables are populated to `this.props`. Only then the query is executed with the new sort order.

## Prepare variables

Let's say that we want to query 1000 Pokemons when we sort by id, but 100000 otherwise.
This can be achieved with `prepareVariables`:

```javascript
export default Relay.createContainer(
  withRouter(ListPage),
  {
    initialVariables: {
      sortOrder: 'id_DESC'
    },
    prepareVariables: (prevVariables) => {
      amount: prevVariables.sortOrder.startsWith('id') ? 1000 : 100000
    },
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          allPokemons (first: $amount, orderBy: $sortOrder) {
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
Initially, we sort descending by id and thus only query the first 1000 Pokemons. If however the `sortOrder` variable is changed from within the component with a call to `setVariables`, we might change that amount to 100000.
