# Cursors and Pagination

*Pagination* is often needed when we want the user of our app to only see a subset of our data at the same time. To achieve this, we can slice the data in same sized chunks, called pages, and let the user browse forwards or backwards. *Cursors* expand on this concept: they can be used to define a custom starting point for a pagination query.

Relay comes with its own standard for pagination defining arguments to connection fields that provide a convenient way to realize pagination in a Relay app.

This concept really shines when combined with other constraints, like the sorting or filtering of a connection.

## Slicing a connection

When we slice a connection, we only query a (normally) small amount of consecutive nodes in the connection. We can choose at which end of the connection we want to pick nodes, so we end up with two possibilities

* using the `first` argument, we can query the first few nodes of a connection
* using the `last` argument, we can query the last few nodes of a connection

We already saw the `first` argument in action. `last` is used exactly the same:

```graphql
query {
  viewer {
    allPokemons (last: 10) {
      edges {
        node {
          id
          name
          url
        }
      }
    }
  }
}
```

This would query the last 10 Pokemons of the `allPokemons` connection.

## The cursor concept

Slicing a connection by itself is already pretty neat! If we are only interested in a few nodes, we don't have to query all of them which may potentially be a lot. But what would be really powerful is to be able to query the *next* few nodes after a specific one. In Relay, this is done using cursors.

A cursor can be seen as a pointer to a specific node. To obtain a cursor for a specific node, we can select the `cursor` field on `edges`:
```graphql
query {
  viewer {
    allPokemons (first: 10) {
      edges {
        cursor
        node {
          id
        }
      }
    }
  }
}
```

This way, we obtain the first 10 Pokemons and their cursors. Using a specific cursor, we can

* query the first few nodes of a connection after this cursor using `first` and `after`
* query the last few nodes of a connection before this cursor using `last` and `before`

Let's say the last of those 10 cursors has the value `cursor-10`. Then we can query the next 10 nodes by using the `after` argument in combination with `first`:
```graphql
query {
  viewer {
    allPokemons (first: 10, after: "cursor-10") {
      edges {
        cursor
        node {
          id
        }
      }
    }
  }
}
```

We can combine `after` and `before` in the same manner:
```graphql
query {
  viewer {
    allPokemons (last: 10, before: "cursor-10") {
      edges {
        cursor
        node {
          id
        }
      }
    }
  }
}
```

This query would again return the first 10 Pokemons.

> Mixing `first` and `after` with `last` and `before` is highly discouraged and should not be done.
