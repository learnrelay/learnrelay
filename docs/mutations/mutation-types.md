# Mutation Types

> Explain how many types do they have, in which situation a specific type is preferred over the others

As we saw in the previous section, Relay employs a client-side cache.
Whenever we are sending a mutation to the server, Relay needs to know how to update this cache with the mutation query result.

We have to add mutation types to the array `getConfigs` for a mutation to configure this behaviour.

Oftentimes we will only use one of the types for one mutation, but we can combine multiple mutation types for the same mutation as well.

## RANGE_ADD

If a mutation is creating a new node, we have to use `RANGE_ADD`:

```javascript
getConfigs () {
  return [{
    type: 'RANGE_ADD',
    parentName: 'viewer',
    parentID: this.props.viewer.id,
    connectionName: 'allPokemons',
    edgeName: 'edge',
    rangeBehaviors: {
      '': 'append',
    },
  }]
}
```

We set `parentName` to `viewer`, `connectionName` to `allPokemons` and `edgeName` to `edge`.
Check the `CreatePokemonPayload` of the `createPokemonMutation` to find the exact names you have to use.

The `append` inside `rangeBehaviors` means that we are appending the new edge to the present edges of `allPokemons`.
If we used `prepend`, we could prepend the edge instead.

Note that most of the time it is sufficient to only use one key `''` inside `rangeBehaviors`.
If you need different behaviour depending on some other value of the connection, you can add different keys and define different behaviour like that. Check [this article](http://mgiroux.me/2016/the-mysterious-relay-range-behaviours/) for further details.

## FIELDS_CHANGE

To update an existing node of type `Pokemon`, we can use `FIELDS_CHANGE`:

```javascript
getConfigs () {
  return [{
    type: 'FIELDS_CHANGE',
    fieldIDs: {
      pokemon: this.props.pokemonId,
    },
  }]
}
```

We set `pokemon` in `fieldIDs` to `this.props.pokemonId`. Like this we say, that the node `pokemon` in the mutation query response denotes the data item in the Relay cache with id `this.props.pokemonId`.

Check the `UpdatePokemonPayload` of the `updatePokemonMutation` to find the exact names you have to use.

## NODE_DELETE

To delete an existing node of type `Pokemon`, we can use `NODE_DELETE`:

```javascript
getConfigs () {
  return [{
    type: 'NODE_DELETE',
    parentName: 'viewer',
    parentID: this.props.viewerId,
    connectionName: 'pokemon',
    deletedIDFieldName: 'deletedId',
  }]
}
```

We set `parentName` to `viewer`, `connectionName` to `pokemon` and `edgeName` to `edge`.

Note that, we could use `allPokemons` for the `connectionName` to achieve the same as well.
Check the `DeletePokemonPayload` of the `deletePokemonMutation` to find the exact names you have to use.

## RANGE_DELETE

To remove one or more existing edge between two nodes, we can use `RANGE_DELETE`:

```javascript
getConfigs() {
  return [{
    type: 'RANGE_DELETE',
    parentName: 'pokemon',
    parentID: this.props.pokemon.id,
    connectionName: 'similarPokemons',
    deletedIDFieldName: 'deletedIds',
  }];
}
```

This will effectively remove all nodes included by id in `deletedIds` from the `similarPokemons` connection of the specified `pokemon`, but the nodes themselves will still be present. This is only really useful for nested fields, that's why we included a fictitious edge `similarPokemons` that could contain all pokemons that are similar to a specific one.

Note that this mutation type is not required for our Pokedex app.

## REQUIRED_CHILDREN

To query fields on a newly created that are not reachable by an edge you can use `REQUIRED_CHILDREN`:

```javascript
getConfigs() {
  return [{
    type: 'REQUIRED_CHILDREN',
    children: [Relay.QL`
      fragment on AddThingPayload {
        someField
      }
    `],
  }];
}
```

This will make the object `addThing` available in the `onSuccess` callback of the mutation, but will **not** write the changes to the store.
This type can be used to redirect to a view that depends on a newly created node once it's created.

Note that this type is rarely used and only applicable in very specific use cases.

## Step 6: Delete a Pokemon
