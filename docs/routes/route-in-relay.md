# Routes 

In the previous chapters, we have seen how the Queries and the Connections are used to fetch the data from the remote server. In this chapter, we will talk more about what Relay does behind the scene using a **Routes** concept.

When we start talking about **Routes**, you might be thinking of URL routing system that could be used to manage routes in an application. However, Routes in Relay are totally different story. 

Routes are normal objects that declare root queries. Relay will aggregate the defined queries with fragments by using **Relay.Renderer**, we will talk about it in a second, and send them to a remote server to fetch data. 

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
};
```
In this example, the route is named as PokemonRoute. It has the queries which contain the viewer fragment that has the limit parameter equal to 100000.

> In the future, Relay might rename **RelayRoute** to **RelayQueryRoots** or even **RelayQueryConfig** in order to alleviate this confusion.
