# React Router Relay

As we have seen in the previous chapter, Relay doesn't have a built-in routing system, which is by design. The de-facto routing library is [React Router Relay](https://github.com/relay-tools/react-router-relay). It is an integration of Relay and [React Router](https://github.com/reactjs/react-router) that aims to provide a complete routing system for Relay. Let's take a look at the following example:

```javascript
<Router                                         // Router is a root component
  environment={Relay.Store}                     // Use the default Relay store to keep our data
  render={applyRouterMiddleware(useRelay)}      // Tell React Router to use Relay routing system
  history={browserHistory}                      // Use Browser History
>
  <Route                                        // Setup a path for the home page
    path='/'
    component={HomePage}
    queries={ViewerQueries}
  />
</Router>
```

In this example, we initialize the routes in our application using the **Router** component, which requires the environment, render, and history arguments. We combine the Relay container defined in the `HomePage` container with the `ViewerQueries`. As seen before, this injects the `viewer` field to the props of `HomePage`. The actual query defined in `HomePage` is executed whenever the root path `/` is visited. The returned data will be kept inside the **Relay.Store** and also available in the HomePage via `props`.

> React Router Relay actually uses Relay.Renderer behind the scenes to combine a container with a query. It makes sure that the data is available before the component gets rendered to the screen.

## Exercise 04: Integrating React Router Relay

In this step, we will create two paths for creating and viewing a Pokemon. To start, lets first open the `src/index.js` and set our paths:

```javascript
// src/index.js
ReactDOM.render(
  ...
    <Route path='/' component={ListPage} queries={ViewerQueries} />
    <Route path='/create' component={PokemonPage} queries={ViewerQueries} />    // Creating path
    <Route path='/view/:id' component={PokemonPage} queries={ViewerQueries} />  // Viewing path accepts the id parameter
  ...
)
```

Both paths use the `PokemonPage` container and the `ViewerQueries` query object. React Router Relay takes care of combining them and fetching data from a remote server for us.

> Note that the route can have parameters which will be passed down to the container and get combined with its fragment.

Next, let's modify our `AddNew` and `PokemonPreview` components to redirect to the newly created routes whenever a user clicks on the "Add New" button or on a Pokemon card.

```javascript
// src/components/AddNew.js

import {withRouter, Link} from 'react-router'                // Import Link component
class AddNew extends React.Component {
  render () {
    return (
      <Link to='/create' className={classes.link}>           // When it gets clicked, redirect to the "/create" path
        ...
      </Link>
    )
  }
}
```


```javascript
// src/components/PokemonPreview.js

import {withRouter, Link} from 'react-router'                                 // Import Link component
class PokemonPreview extends React.Component {
  ...
  render () {
    return (
      <Link className={classes.link} to={`/view/${this.props.pokemon.id}`}>   // When it gets clicked, redirect to the "/view/:id" path
        ...
      </Link>
    )
  }
}

```

As you can see, the **to** attribute is used to specify the destination route. In the case of PokemonPreview, we use `this.props.pokemon.id` as an argument for the id parameter.

Now, let's go and click on a card or the "Add New" button to see your new beautiful pages.
