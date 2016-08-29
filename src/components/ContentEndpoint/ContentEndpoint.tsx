import * as React from 'react'
import {StoredState} from '../../utils/statestore'

const styles: any = require('./ContentEndpoint.module.styl')

interface Props {
}

interface State {
}

interface Context {
  storedState: StoredState
  updateStoredState: (keyPath: string[], value: any) => void
}

export default class ContentEndpoint extends React.Component<Props, State> {

  static contextTypes = {
    storedState: React.PropTypes.object.isRequired,
    updateStoredState: React.PropTypes.func.isRequired,
  }

  context: Context

  render() {
    const redirectUrl = `${window.location.origin}${window.location.pathname}#step-1-warm-up`
    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${__GITHUB_OAUTH_CLIENT_ID__}&scope=user:email&redirect_uri=${redirectUrl}` // tslint:disable-line

    if (this.context.storedState.skippedAuth) {
      return (
        <div>
          I thought about it. It was a mistake. I want a GraphQL Endpoint...
          <a href={githubUrl} className={`pa3 bg-accent pointer ${styles.getEndpoint}`}>
            Get GraphQL Endpoint
          </a>
        </div>
      )
    }

    if (this.context.storedState.user && this.context.storedState.user.endpoint) {
      return (
        <div className='flex flex-column'>
          Congrats this is your endpoint:
          <div className={`pa3 ${styles.showEndpoint}`}>
            {this.context.storedState.user.endpoint}
          </div>
        </div>
      )
    }

    return (
      <div>
        <a href={githubUrl}>
          Get GraphQL Endpoint
        </a>
        <button onClick={() => this.context.updateStoredState(['skippedAuth'], true)}>
          Read on without GraphQL endpoint (non-interactive)
        </button>
      </div>
    )
  }
}
