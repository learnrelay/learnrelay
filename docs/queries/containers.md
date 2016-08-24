# Containers

> Understand Containers.

To use queries in one of your React components, you use the higher-order component `Container` provided by Relay.
Using containers comes with two guarantees by Relay:

* The required data is available before the component is rendered.
* The component will be updated whenever some of the required data has been updated elsewhere.

## Creating a Relay Container

To expose data to your React component we can use the method `Relay.createContainer`, which looks like this:
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

This injects the prop `pokemon` to the inner component `PokemonPreview`. The way Relay handles data updates works nicely together with the way React handles updates to props: whenever props change for one component, it is checked if it is necessary for this component to be re-rendered. The same is true for props injected by the Relay container.

## Composing Queries in Containers

One of the big strengths of React is the ability to compose components in an efficient and hassle-free way. Relay applies this concept to queries as well:
they are composed by combining so called [Fragments](fragments.md).
