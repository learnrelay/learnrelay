# Relay Store

In this chapter, we will learn how to trigger our mutation, created from the previous chapter, by using **Relay Store**. Relay Store is a class that has two static methods for dispatching a mutation to the remote server, similar to calling an "Action" in [Redux](http://redux.js.org).

## commitUpdate()

Most of the time, this method will be used to dispatch our mutation to the server. Let's consider the following example:

```javascript
Relay.Store.commitUpdate(                      // Dispatch our mutation
  new UpdatePokemonMutation({                  // Pass an object to the mutation
    id: this.props.id,
    name: 'Pikachu'
  })
)
```

We dispatch our `UpdatePokemonMutation` and pass the properties id and name to it. The properties will be available in the Mutation as `this.props`.

### applyUpdate()

The `applyUpdate` method is very similar to the `commitUpdate` method. The only difference is that the mutation is not committed immediately. It does however return a transaction object that contains **commit()**, **rollback()**, **recommit()** as well as some other useful methods. You can call these methods afterwards.

```javascript
const transaction = Relay.Store.applyUpdate(   // Apply our mutation
  new UpdatePokemonMutation({                  // Pass an object to the mutation
    id: this.props.id,
    name: 'Pikachu'
  })
)
transaction.commit()                           // Commit the mutation
```

## Exercise 05: Create a Pokemon

> To start with this exercise, checkout the according branch and insert your endpoint in `package.json` and `index.js` in the pokedex application:

```sh
git checkout step-05
# copy and paste your endpoint to `package.json` and index.js
npm install
npm start
# Open localhost:3000
```

After clicking the "Add New" button, the page will be redirected to the `/create` path. In this page, there is a form to create a new Pokemon! However, we have not created a mutation just yet. Let's do that now!

```javascript
// src/mutations/CreatePokemonMutation.js
import Relay from 'react-relay'
export default class CreatePokemonMutation extends Relay.Mutation {

  static fragments = {                            // Specify required data for this mutation
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `,
  }

  getMutation () {
    return Relay.QL`mutation{createPokemon}`      // Use CreatePokemon mutation
  }

  getFatQuery () {
    return Relay.QL`
      fragment on CreatePokemonPayload {          // The fragment is always named as the mutation name + 'Payload' (CreatePokemon + Payload)
        pokemon
        edge
        viewer {
          allPokemons
        }
      }
    `
  }

  getConfigs () {
    return [{                                      // Use RANGE_ADD type
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

  getVariables () {                                 // Define an object to be sent as an input argument
    return {
      name: this.props.name,
      url: this.props.url,
    }
  }
}
```

We just created the mutation called **createPokemon**. In this mutation, there is a special **fragments** method that we have not talked about before. It is used to specify data needed to run this mutation. In our case, we required an id field on the Viewer fragment.

We then specified the data that may have changed due to the mutation in the `getFatQuery` method. Since this mutation is for creating a new Pokemon, we used the **RANGE_ADD** config type, which will be explained in the following chapter with more detail. Last but not least, we told Relay in `getVariables` to use the name and the url properties as input arguments.

Now, we will use `Relay.Store` to dispatch our createPokemon mutation to the remote server. Let's open `src/views/PokemonPage`:

```javascript
// src/views/PokemonPage.js
import CreatePokemonMutation from '../mutations/CreatePokemonMutation'
class PokemonPage extends React.Component {
  ...
  _addPokemon = () => {
    Relay.Store.commitUpdate(      // Dispatch CreatePokemonMutation and pass the name and the url to it
      new CreatePokemonMutation({name: this.state.name, url: this.state.url, viewer: this.props.viewer}),
      {
        onSuccess: () => this.context.router.push('/'),
        onFailure: (transaction) => console.log(transaction),
      },
    )
  }

  render () {
    return (
      ...
      <div
        className={classes.button + ' ' + classes.saveButton}
        onClick={this._addPokemon}   // Bind a click event to call our mutation
      >
      ...
    )
  }
}

export default Relay.createContainer(
  PokemonPage,
  {
    ...
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          id
          ${CreatePokemonMutation.getFragment('viewer')}  // Include our mutation fragment
          ...
        }
      `,
    },
  },
)
```

At the beginning of the file, we set up `Relay.Store` to dispatch our mutation and then bind a click event to the save button. In addition, we also used the `getFragment` method to include our mutation fragment.

It's time to test our first mutation! Go ahead and fill in some information into the form and click on the save button.

> If you do not have fragments in your mutation, you do not need to use `getFragment` to include it in the container

That's it for this chapter. Let's move on!
