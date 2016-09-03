# What is a Mutation?

So far, we have seen how to fetch data from the remote server and store it in the **Relay Store**. The remaining question is how to modify or delete some data in the store. In Relay, this mechanism is called **Mutations**.  Mutations consist of two steps: writing data to the store and reading all changed data from the store.

## Methods

**Relay.Mutation** is a class that has four abstract methods. When we create our own Mutation, we need to create a class which extends the Relay.Mutation, which means that we will need to implement all of the abstract methods. Here is the list of those abstract methods in detail:

#### getMutation()

We use the `getMutation` method to specify a name of a GraphQL mutation that we want to use, for example, `updatePokemon` mutation.

```javascript
getMutation() {
  return Relay.QL`mutation {updatePokemon}`;  // updatePokemon mutation defined in our GraphQL server will be used
}
```

#### getVariables()

The `getVariables` method is used to prepare data that will be sent as input arguments in the GraphQL mutation.

```javascript
getVariables() {
  return {name: this.props.name};             // Send this object to the back-end
}
```

> `this.props` is an object passed down from the **commitUpdate()** method, will be explained in the next chapter.

#### getFatQuery()

The second step of Relay mutation is to read some changed data from the store, this is where the `getFatQuery` method comes into play. It is used to specify all fields in our Relay Store that could have changed due to the mutation. Relay will use this information to fetch necessary data from the remote server.

```javascript
getFatQuery() {
  return Relay.QL`
    fragment on UpdatePokemonPayload {         // The fragment name is the same as the mutation name + 'Payload'
      pokemons {                               // We specify that the name of Pokemons might change
        name
      }
    }
  `;
}
```

#### getConfigs()

Finally, the `getConfigs` method tells Relay how to deal with the response data. There are many configurations that we could use, these will be talked in more details in [Mutation Types](mutation-types.md) chapter.

```javascript
getConfigs() {
  return [{
    type: 'FIELDS_CHANGE',                      // Use FIELDS_CHANGE type, will be explained in the next chapter
    fieldIDs: {
      pokemon: this.props.id,                   // Apply the returned pokemon field with the given id
    },
  }];
}
```

In this example, we assume that the remote server returned an object containing the `pokemon` property. Relay will apply this object with an object in the store whose id is equal to the given id.

> Relay compares the information provided in the `getFatQuery` and the `getConfigs` methods with the data in the Relay Store, as known as **tracked query**, in order to optimize a request by sending data as less as possible across the wire. This mechanism is called **intersecting**.
