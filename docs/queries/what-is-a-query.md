# What is a Query?

When we make a request to a GraphQL server to declare our specific data requirements, we are sending a *query*.

Queries are a central part of Relay. They are consist off fields which are either *scalar* or *non-scalar*.

Scalar fields are primitive data types like `String` or `Int`.
Non-scalar fields consist of non-scalar fields or scalar fields themselves.

*Models* from your GraphQL schema are exposed as non-scalar fields in the query.

Queries in GraphQL are *hierarchical*, that means that if you include a non-scalar field in a query you have to define a subselection of fields on it.

## The viewer object

Queries in Relay always start with the same non-scalar field, called the `viewer`.

We are usually interested in queries that fetch all data or only one specific data item for a certain model, so our GraphQL backend should at least expose those queries through the `viewer` object.

A query to fetch the `id`, `name` and `url` fields of all pokemons on the server could look like this:

```graphql
query {
  allPokemons (first: 100000) {
    edges {
      node {
        id
        name
        url
      }
    }
  }
}
```

This query contains several parts that are yet unknown to us.

In this chapter, we will learn a lot on the different parts and how to put them all together to build flexible, composable queries.

## Chapter overview

Whenever we want to send a query to our server in one of our React components, we have to wrap it with a [Container](containers-fragments.md).

Usually you never write complete queries as above. Instead you are building them by combining [Fragments](containers-fragments.md). You can add additional flexibility using [Query Variables](variables.md).

Relay supports us by using the concept of [Data Masking](data-masking.md) that ensures that every component states exactly the data requirements it needs, no more, no less.
