# Route in Relay

In the previous chapters, we have seen how the Queries and the Connections are used to fetch the data from the remote server. In this chapter, we will talk more about what Relay does behind the scenes using a **Routes** concept.

When we are talking about **Routes**, you might be thinking of URL routing system that could be used to manage routes in an application. However, Routes in Relay are a totally different story.

Routes are normal objects that declare root queries. Relay will aggregate the defined queries with fragments by using **Relay.Renderer**, which we will talk about it in a second, and send them to a remote server to fetch data.

```javascript
const pokemonRoute = {
  queries: {
    viewer: () => Relay.QL`
      query { viewer(first: $limit) }
    `
  },
  params: {
    limit: '100000'
  },
  name: 'PokemonRoute'
}
```
In this example, the route is named `PokemonRoute`. It can be used by queries which contain the viewer fragment that has the limit parameter equal to 100000.

> In the future, Relay might rename **RelayRoute** to **RelayQueryRoots** or even **RelayQueryConfig** in order to alleviate this confusion.


## Relay.Renderer

`Relay.Renderer` is a component that aggregates a route with a fragment, defined in a container, to perform data fetching. Consider the following example:

```javascript
<Relay.Renderer
  Container={ListPage}                 // Relay Container
  queryConfig={pokemonRoute}           // Our route that we defined previously
  environment={Relay.Store}            // Default Relay store
/>
```

`Relay.Renderer` will extract the fragment from the `ListPage` container and combine it with the `pokemonRoute`. Relay now knows where the starting node is and which data it needs to fetch. It will then send a request to a remote server and put the returned data in the specified store.
