import * as React from 'react' // tslint:disable-line
import * as ReactDOM from 'react-dom'
import {Router, browserHistory, applyRouterMiddleware} from 'react-router'
import {useScroll} from 'react-router-scroll'
import * as cuid from 'cuid'
import loadAnalytics from './utils/analytics'
import routes from './routes'

import './polyfill'

loadAnalytics()

if (!window.localStorage.hasOwnProperty('learnrelay_guestid')) {
  window.localStorage.setItem('learnrelay_guestid', cuid())
}
const guestId = window.localStorage.getItem('learnrelay_guestid')

analytics.identify(guestId, () => {
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
