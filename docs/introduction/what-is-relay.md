# What's Relay?

Relay is an open source framework from Facebook for building data-driven React applications, which is heavily inspired by React. **React lets you build your UI declaratively, Relay lets you describe your data declaratively using GraphQL**. Each component can specify its own data dependencies, Relay will take care of fetching data from a remote server and make sure that the required data is available to be used inside the component before it gets rendered to the screen. Moreover, Relay helps you manage the data in an efficient way by using batching, caching, diffing, and a lot more! Here are some other benefits that Relay brings to the table:

- Co-locating data with the component view, that makes it easier to reason about the structure of your data
- No over-fetching and no under-fetching, you get exactly the data you defined
- Data masking, a component can only access its specified data which prevents error-prone

## How is it different than other Flux implementations?

Relay is also inspired by Flux. It, however, contains just one central store and doesn't allow you to manage the store by yourself, you need to use **Mutations** and **Queries** to mutate and to get the data from a remote server using GraphQL. In other words, you will not be able to store any data that doesn't exist on your remote server. In case you need to manage some state data on your own, you could also use another Flux implementation, such as Redux, with Relay in order to manage an application state.

## Relay compositions

Relay consists of many important components, such as Relay.Renderer, Relay.Route, Relay.Container, and etc. These components will be explained in more detail in the following chapters. In the meantime, you could check out [Relay for Visual Learners](http://sgwilym.github.io/relay-visual-learners) that will give you the big picture of the Relay compositions.
