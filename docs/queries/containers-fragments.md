# Containers & Fragments

> Understand Containers.

To use queries in one of your React components, you have to wrap them using the higher-order component `Container` provided by Relay.

Containers come with two guarantees by Relay:

* The required data is available before the component is rendered.
* The component will be updated whenever some of the required data has been updated elsewhere.

The way Relay handles data updates works nicely together with the way React handles updates to props: whenever props change for one component, it is checked if it is necessary for this component to be re-rendered. The same is true for props injected by the Relay container.

## Creating a Relay Container

To expose data to your React component we can use the method `Relay.createContainer`. To wrap the React component `Component` we can write the following code:

```javascript
export default Relay.createContainer(
  withRouter(Component),
  {
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          id
        }
      `,
    },
  },
)
```

This injects the prop `viewer` to the inner component `Component`.

## Composing Queries using Fragments

One of the big strengths of React is the ability to compose components in an efficient and hassle-free way. Relay applies this concept to queries:
they are composed by combining so called *fragments*.

Remember the `viewer` object introduced in the last section? As we need it for every query that we are going to send, it makes a lot of sense to define it once and use it everywhere else.

This is why we created the top-level `ViewerQueries` in `index.js` in `step-1`:

```javascript
const ViewerQueries = { viewer: () => Relay.QL`query { viewer }` }
```

Let's have another look at the Relay container we just built:

```javascript
export default Relay.createContainer(
  withRouter(Component),
  {
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          id
        }
      `,
    },
  },
)
```

Here we are building a fragment on top of the `viewer` object defined in `ViewerQueries`.

## Practice: Step 2

In this step, we are adding the `ViewerQueries` to `index.js`. We are also preparing the `ListPage` component for later queries by already wrapping it with a Relay container now and building the fragment on top of the `viewer` objet as we seen above.

To give you a headstart, we already defined `ViewerQueries` in `index.js` and exposed it to `ListPage`. We will have a closer look at this topic later.

For now, just modify `ListPage`, so that it queries the `id` field of the `viewer` object.

> Remember: if you are stuck at any time, sneak a peek at `step-2-solutions` to get a hint.
