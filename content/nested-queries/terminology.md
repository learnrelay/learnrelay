# Terminology

The terminology of Relay can be quite overwhelming in the beginning. Relay introduces a handful of new concepts on top of GraphQL, mainly in order to manage relationships between models.

## Connections

In Relay, relations between models are called *connections*. We use models and relations to think of our data structure. However that doesn't help us a lot for when we want to investigate the context of a specific data item. That's why Relay works with *nodes* and *edges*.

## Nodes

We call a specific data item a *node*. Each node belongs to a specific model. In our case, we will work with nodes of type Pokemon.

The `viewer` object of Relay can actually be seen as a node as well. Every node that exists on our server should be reachable indirectly via the `viewer` , otherwise there's no way to query it.

## Edges

Whenever there is a relation between two specific nodes, we say that they are connected with an *edge*.

In Relay, we can traverse the data graph from one node to the other by using the `edges` non-scalar field.

The edges field contains one field `node`, that finally exposes all the fields of the real data item.
