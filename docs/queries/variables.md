# Variables

Oftentimes, we want to use queries that are identical on a structural level, but differ in a semantic detail.
Imagine, for example, that the number of pokemons that we want to fetch depends on some external switch.

We will see query variables in action soon. For now, try to understand the following examples!

## Initial variables

For situations like that, we can set `initialVariables` when we create a container.
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

At the moment we are always querying 100000 pokemons. Let's make that more flexible:

```javascript
export default Relay.createContainer(
  withRouter(ListPage),
  {
    initialVariables: {
      amount: 100000
    },
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          allPokemons (first: $amount) {
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

## Prepare variables

```javascript
export default Relay.createContainer(
  withRouter(ListPage),
  {
    initialVariables: {
      amount: 100000
    },
    prepareVariables: (prevVariables) => {
      hugetFetch: preevVariables.amount && prevVariables.amount > 1000
    },
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          allPokemons (first: $amount) {
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
