# Queries

In this chapter, we will learn [what a query is](what-is-a-query.md). You use queries to fetch data from the GraphQL server.

Whenever we want to send a query to our server in one of our React components, we have to wrap it with a [container](containers-fragments.md).

Usually you never write complete queries as above. Instead you are building them by combining [fragments](working-with-fragments.md).

By combining these parts, we will get familiar with our Pokedex app and prepare things for the following steps.

Afterwards, we'll learn how to add additional flexibility using [query variables](variables.md) and how Relay supports us by employing the concept of [data masking](data-masking.md) that ensures that every component states exactly the data requirements it needs, no more, no less.
