import * as React from 'react'
import {StoredState} from '../../utils/statestore'

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
    const redirectUrl = window.location.href
    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${__GITHUB_OAUTH_CLIENT_ID__}&scope=user:email&redirect_uri=${redirectUrl}` // tslint:disable-line

    if (this.context.storedState.skippedAuth) {
      return (
        <div>
          I thought about it. It was a mistake. I want a GraphQL Endpoint...
          <a href={githubUrl}>
            Get GraphQL Endpoint
          </a>
        </div>
      )
    }

    if (this.context.storedState.user && this.context.storedState.user.endpoint) {
      return (
        <div>
          Congrats this is your endpoint:
          {this.context.storedState.user.endpoint}
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
