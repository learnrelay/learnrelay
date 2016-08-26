# Containers and Fragments

To use queries in one of your React components, you have to wrap them using the higher-order Relay component `Container`.

Containers come with two guarantees for the wrapped component:

* The required data is available before the wrapped component is rendered.
* The wrapped component will be updated whenever some of the required data has been updated elsewhere.

The way Relay handles data updates works nicely together with the way React handles updates to props: whenever props change for one component, it is checked if it is necessary for this component to be re-rendered. The same is true for props injected by the Relay container.

## Creating a Relay Container

To expose data to your React component we can use the method `Relay.createContainer`. We can use this to wrap the React component `ListPage` like this:

```javascript
export default Relay.createContainer(
  withRouter(ListPage),
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

This injects the prop `viewer` to the inner component `ListPage`.

## Composing Queries using Fragments

One of the big strengths of React is the ability to compose components in an efficient and hassle-free way.

Relay applies this concept of composition to queries: you build queries by combining so called *fragments*.

Remember the `viewer` object introduced in the last section? As we need it for every query that we are going to send, it makes a lot of sense to define it once and use it everywhere else.

This is why we created the top-level `ViewerQueries` in `index.js` in `step-1`:

```javascript
const ViewerQueries = { viewer: () => Relay.QL`query { viewer }` }
```

Let's have another look at the Relay container we just built:

```javascript
export default Relay.createContainer(
  withRouter(ListPage),
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

We also inserted `ViewerQueries` to all the subviews in `index.js`. Later, when we talk about routing in Relay, we will see the exact meaning of this.

## Step 2: Prepare the ListPage for further action

In this step, we are adding the `ViewerQueries` to `index.js`. We are also preparing the `ListPage` component for later queries by already wrapping it with a Relay container now and building the fragment on top of the `viewer` objet as we seen above.

To give you a headstart, we already defined `ViewerQueries` in `index.js` and exposed it to `ListPage`.

For now, just modify `ListPage`, so that it queries the `id` field of the `viewer` object.

> Remember: if you are stuck at any time, sneak a peek at `step-2-solutions` to get a hint or check the previous sections.
