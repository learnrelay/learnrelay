<iframe height="315" src="https://www.youtube.com/embed/iohi9fXPzAw" frameborder="0" allowfullscreen></iframe>

# What is a Query?

When we make a request to a GraphQL server to declare our specific data requirements, we are sending a *query*.
Queries are a central part of Relay. They consist of fields which are either *scalar* or *non-scalar*.
Scalar fields are primitive data types like `String` or `Int`.
Non-scalar fields consist of non-scalar fields or scalar fields themselves.

*Models* from your GraphQL schema are exposed as non-scalar fields in the query.
Queries in GraphQL are *hierarchical*, that means that if you include a non-scalar field in a query, it must always have a subselection. That subselection can be composed from scalar fields, or other non-scalar fields (at which point they in turn also need a subselection).

## The `node` and `viewer` fields

Data access typically follows one of two patterns. In some cases, your application will want to fetch an item by its unique identifier. In this case we use the `node(id: $id)` root field. In other cases, the application will need to fetch data that is accessible by the currently logged-in user (aka the "viewer"). For example, it wouldn't make sense for a generic `User` object to have a `news_feed` - that feed is private to the person viewing it. Relay recommends that these types of viewer-contextual fields should be placed under the `viewer` root field.

To summarize, our GraphQL backend should at least expose `node` (to fetch single items by id) and `viewer` (offering contextual subfields depending on the currently logged-in user or other parameters) as root fields in the GraphQL schema.

A query to fetch the `id`, `name` and `url` fields of all Pokemons on the server could look like this:

```graphql
query {
  viewer {
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
}
```

This query contains several parts that are currently unknown to us. However, at the end of this chapter, we will have a better understanding of all the different parts in this query and will be able to put them together to build flexible, composable queries.
