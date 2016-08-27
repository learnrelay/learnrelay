import * as React from 'react' // tslint:disable-line
import * as ReactDOM from 'react-dom'
import {Router, browserHistory, applyRouterMiddleware} from 'react-router'
import {useScroll} from 'react-router-scroll'
import loadAnalytics from './utils/analytics'
import routes from './routes'

import './polyfill'

loadAnalytics()

Smooch.init({appToken: __SMOOCH_TOKEN__})

browserHistory.listen(({pathname}) => {
  analytics.page()
  analytics.track(`view documenation: ${pathname}`)
})

function getCookie(k): string | null {
  return (document.cookie.match('(^|; )' + k + '=([^;]*)') || 0)[2]
}

const clientId = getCookie('graphcool_client_id')
if (clientId) {
  analytics.identify(
    clientId,
    {
      'Product': 'Documentation',
    },
    {
      integrations: {
        'All': false,
        'Mixpanel': true,
      },
    }
  )
}

ReactDOM.render(
  (
    <Router
      routes={routes}
      history={browserHistory}
      render={applyRouterMiddleware(useScroll((props, { location }) => location.hash === ''))}
    />
  ),
  document.getElementById('root')
)
