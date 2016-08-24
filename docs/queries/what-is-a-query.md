# What is a Query?

When we want to make a request to a GraphQL server to declare our specific data requirements, we call that a *query*.
A query to fetch all pokemons on the server could look like this:
```graphql
query {
  allPokemons {
    id
    name
    level
  }
}
```

Whenever we want to send a query to our server in one of our React components, we have to wrap it with a [Container](containers.md).

In further subsections we will see how we can compose queries by combining [Fragments](fragments.md). We can add additionally flexibility by using [Query Variables](variables.md).

Relay supports us by using the concept of [Data Masking](data-masking.md) that ensures that every component states exactly the data requirements it needs, no more, no less.
