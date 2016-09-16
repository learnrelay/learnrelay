# Containers and Fragments

To use queries in one of your React components, you have to wrap them using the higher-order Relay component `Container`.

Containers provide the wrapped component with two guarantees:

* The required data is available before the wrapped component is rendered.
* The wrapped component will be updated whenever some of the required data has been updated elsewhere.

The way Relay handles data updates works nicely with the way React handles updates to props: whenever props change for one component, the component is checked for the need to re-render. The same is true for props injected by the Relay container.

## Creating a Relay Container

To expose data to your React component we can use the method `Relay.createContainer`. To wrap the React component `ListPage` we can write the following right below the `ListPage` component in `ListPage.js` :

```javascript
export default Relay.createContainer(
  ListPage,
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

This creates a new Relay container and injects the prop `viewer` to the inner `ListPage` component.

## Composing Queries using Fragments

One of the big strengths of React is the ability to compose components in an efficient and hassle-free way.
Relay applies this concept of composition to queries: you build queries by combining so called *fragments*.

Remember the `viewer` object introduced in the last section? As we need it for every query that we are going to send, it makes a lot of sense to define it once and use it everywhere else. This is why we created the top-level `ViewerQueries` in `index.js` in `step-01`:

```javascript
const ViewerQueries = { viewer: () => Relay.QL`query { viewer }` }
```

Let's have another look at the Relay container we just built:

```javascript
export default Relay.createContainer(
  ListPage,
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

Here we are building a fragment on top of the `viewer` object defined in `ViewerQueries`. In the next exercise we will see how we can expose `ViewerQueries` to a subview in the router in `index.js`. Later, when we talk about routing in Relay, we will see the exact meaning of this.

## Exercise 02: Prepare the ListPage for further action

In this step, we are adding the `ViewerQueries` to `index.js`. We are also preparing the `ListPage` component for later queries by wrapping it with a Relay container now and building the fragment on top of the `viewer` object as we have seen above.

To give you a headstart, we already defined `ViewerQueries` in `index.js`. Now you have to expose it to `ListPage`.
Currently, `ListPage` is associated with the path `/` in this line in `index.js`:

```javascript
<Route path='/' component={ListPage} />
```

You can use the `queries` property on a Route to expose queries to a component:

```javascript
<Route path='/' component={ListPage} queries={ViewerQueries} />
```

Now we can query the `id` field of the `viewer` object in the Relay container of `ListPage` as seen above.
To verify that we can query the viewer id, remove the content of the `div` element in the render method in `ListPage` and replace it with

```javascript
{`Your viewer id is: ${this.props.viewer.id}`}
```

> Remember: if you are stuck at any time, sneak a peek at `step-02-solutions` to get a hint or check the previous sections.
