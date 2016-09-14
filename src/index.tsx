import * as React from 'react' // tslint:disable-line
import * as ReactDOM from 'react-dom'
import {Router, browserHistory, applyRouterMiddleware} from 'react-router'
import {useScroll} from 'react-router-scroll'
import * as cuid from 'cuid'
import loadAnalytics from './utils/analytics'
import routes from './routes'
import * as Cookies from 'js-cookie'
import {getStoredState} from './utils/statestore'

import './polyfill'

loadAnalytics()

if (!Cookies.get('learnrelay_guestid')) {
  Cookies.set('learnrelay_guestid', cuid())
}
const storedState = getStoredState()
const id = storedState.user
  ? storedState.user.email
  : Cookies.get('learnrelay_guestid')

analytics.identify(id, () => {
  browserHistory.listen(({pathname}) => {
    analytics.page()
    analytics.track(`view: ${pathname}`)
  })
})

function shouldScrollUp(previousProps, {location}) {
  return location.hash === '' && (previousProps === null || previousProps.location.pathname !== location.pathname)
}

ReactDOM.render(
  (
    <Router
      routes={routes}
      history={browserHistory}
      render={applyRouterMiddleware(useScroll(shouldScrollUp))}
    />
  ),
  document.getElementById('root')
)
