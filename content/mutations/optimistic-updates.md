# Optimistic updates

Sometimes we know what the server response *should* look like, if everyhing works well. Then we can pass a fake response to the Relay.Store right after we fired the mutation, instead of waiting for the actual server response, giving the impression of an instantaneous response. You might have heard of the expression "Optimstistic UI", which is based on this idea.

You might have experienced this when using Facebook on your smartphone: you like the comment of a friend and its like count visually increases on your phone. However, as you had a bad connection, the like event never reached the server. Once you get better connection, the applied optimistic update gets rolled back to correct the mistake.

The benefit of optimist updates lies in the increased user experience when everyhing indeed worked well.

## getOptimisticResponse

To specify the optimistic response for a mutation, you can use the `getOptimisticResponse` method.
The optimistic response acts as a mock payload and should only contain fields that you also included in your fat query, or `viewer`.

* Remember the fat query from `AddPokemonMutation`?

```javascript
getFatQuery () {
  return Relay.QL`
    fragment on CreatePokemonPayload {
      pokemon
      edge
      viewer {
        allPokemons
      }
    }
  `
}
```

A reasonable optimistic response could look like this:
```javascript
getOptimisticResponse () {
  return {
    edge: {
      node: {
        name: this.props.name,
        url: this.props.url,
      },
    },
    viewer: {
      id: this.props.viewer.id,
    },
  }
}
```

* For the `DeletePokemonMutation`, a reasonable optimistic response looks like this:

```javascript
getOptimisticResponse () {
  return {
    deletedId: this.props.pokemonId,
  }
}
```

## Step 07: Update a Pokemon

We can already add new pokemons or delete them. But what if we want to give a pokemon a new name, or even a new look (url...)?
We should be able to do that!

But before we will add this new feature, we will implement the `getOptimisticResponse` method for the mutations that we are already using:
`AddPokemonMutation` and `DeletePokemonMutation`. Look above if you are unsure how to exactly set the optimistic response.

Afterwards, you will notice the new `UpdatePokemonMutation` in branch `step-07`. Implement all the basic methods first. If you are unsure about this,
 check the previous sections about mutations. Afterwards, think about how an optimistic response could look like for the `UpdatePokemonMutation` in `getOptimisticResponse` and implement it.

Lastly, you have to actually call the update mutation in `PokemonPage`, whenever a user updates the name or url of a pokemon and clicks on the save button.

In summary, you should
* implement `getOptimisticResponse` for `AddPokemonMutation` and `DeletePokemonMutation`
* implement the basic methods of `UpdatePokemonMutation` and afterwards implement `getOptimisticResponse`
* fire the `UpdatePokemonMutation` when the save button on the `PokemonPage` is clicked
