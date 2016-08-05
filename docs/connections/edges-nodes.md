# Connections, Edges & Nodes

> Goal: Iterate a connection
> 
> Why do I need this? are list not enough?

The terminology of Relay can be quite overwhelming in the beginning. Relay introduces a handful of new concepts on top of GraphQL, mainly in order to manage relationships between models.

This already leads to the first new term: a one-to-many relationship between two models is called a **connection**.

## Example

Let's consider this following simple GraphQL query. It fetches the `releaseDate` of the movie "Inception" and the names of all of its `actors`. The `actors` field is a connection between a movie and multiple actors.

```graphql
{
  movie(title: "Inception") {
    releaseDate
    actors {
      name
    }
  }
}
```

```json
{
  "releaseDate": "2010-08-29T12:00:00Z",
  "actors": [{
    "name": "Leonardo DiCaprio"
  }, {
    "name": "Ellen Page"
  }]
}
```

Now let's take this query and adjust it to the expected format of Relay.

```graphql
{
  movie(title: "Inception") {
    releaseDate
    actors(first: 10) {
      edges {
        node {
          name
        }
      }
    }
  }
}
```

```json
{
  "releaseDate": "2010-08-29T12:00:00Z",
  "actors": {
    "edges": [{
      "node": {
        "name": "Leonardo DiCaprio"
      }
    }, {
      "node": {
        "name": "Ellen Page"
      }
    }]
  }
}
```

## Edges and nodes

Okay, let's see what's going on here. The `actors` connection now has a more complex structure containing the fields `edges` and `node`. These terms should be a bit more clear when looking at the following image.

Don't worry. In order to use Relay, you don't have to understand the reasons why the structure is designed this way but rest assured that [it makes a lot of sense](https://facebook.github.io/relay/graphql/connections.htm).

<div style="text-align: center; padding: 20px 0;"><img src="../assets/images/edges.png" /></div>

Lastly, we also notice the `first: 10` parameter on the `actors` field. This gives us a way to [paginate](https://en.wikipedia.org/wiki/Pagination) over the entire list of related actors. In this case we're taking the first 10 actors (nodes). In the same way we could additionally specify the `after` parameter which allows us to skip a certain amount of nodes.

## Further reading

This was just a brief overview on connections in Relay. If you want to dive deeper please check out the [Relay docs on connections](https://facebook.github.io/relay/docs/graphql-connections.html) or explore the [Relay Cursor Connections Specification](https://facebook.github.io/relay/graphql/connections.htm).
