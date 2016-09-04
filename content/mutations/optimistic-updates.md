# Optimistic updates

Sometimes we know what the server response *should* look like, if everything went well. In this instance, we can pass a fake response to the Relay.Store right after we fired the mutation instead of waiting for the actual server response, giving the impression of an instantaneous response. The expression "Optimstistic UI" is based on this idea.

You may have experienced optimistic updates when using Facebook on your smartphone: you liked the comment of a friend and saw its like count increment only to check again later to see the like count at its previous un-liked count. In this case it is likely that, maybe due to a bad connection, the like event never reached the server. Once you get better connection, the applied optimistic update was rolled back to correct the mistake.

The benefit of optimistic updates lies in the fact that most of time the action is successful. In practice, optimistic updates improve the user experience by providing quick positive feedback to the user for a comparatively low trade off of occasionally misinforming the user of a successful action when really some kind of error occurred.

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

We can already add new Pokemons or delete them. But what if we want to give a Pokemon a new name, or even a new look (url...)?
We should be able to do that!

But before we will add this new feature, we will implement the `getOptimisticResponse` method for the mutations that we are already using:
`AddPokemonMutation` and `DeletePokemonMutation`. Look above if you are unsure how to exactly set the optimistic response.

Afterwards, you will notice the new `UpdatePokemonMutation` in branch `step-07`. Implement all the basic methods first. If you are unsure of how to go about this,
 check the previous sections on mutations. Afterwards, think about how an optimistic response would look like for the `UpdatePokemonMutation` in `getOptimisticResponse`, then implement it!

Finally, you need to call the update mutation in `PokemonPage` whenever a user updates the name or url of a Pokemon and clicks the save button.

In summary, you should
* implement `getOptimisticResponse` for `AddPokemonMutation` and `DeletePokemonMutation`
* implement the basic methods of `UpdatePokemonMutation` and afterwards implement `getOptimisticResponse`
* fire the `UpdatePokemonMutation` when the save button on the `PokemonPage` is clicked
