# What is a Query?

When we want to make a request to a GraphQL server to declare our specific data requirements, we call that a *query*.

Queries are a central part of Relay. They are built off fields which are either *scalar* or *non-scalar*.

Scalar fields are primitive data types like `String` or `Int`.
*Models* from your GraphQL schema are exposed as non-scalar fields in the query.

Queries in GraphQL are *hierarchical*, that means that if you  include a non-scalar field in a query you have to define a subselection of fields on it.

## The viewer

Queries in Relay always start with the same non-scalar field, called the `viewer`.

All "real" queries are exposed through the `viewer` object. Usually, we are interested in queries that fetch all data or only one specific data item for a certain model, so our GraphQL backend should at least expose those queries. A query to fetch the `id`, `name` and `url` fields of all pokemons on the server could look like this:

```graphql
query {
  viewer {
    allPokemons {
      id
      name
      url
    }
  }
}
```

## Chapter overview

Whenever we want to send a query to our server in one of our React components, we have to wrap it with a [Container](containers-fragments.md).

Usually you never write complete queries as above. Instead you are building them by combining [Fragments](containers-fragments.md). You can add additional flexibility using [Query Variables](variables.md).

Relay supports us by using the concept of [Data Masking](data-masking.md) that ensures that every component states exactly the data requirements it needs, no more, no less.
