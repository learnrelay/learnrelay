import * as React from 'react'
import {skipEndpoint, hasSkippedEndpoint} from '../../utils/statestore'

interface Props {
}

interface State {
}

interface Context {
  endpoint: string | null
}

export default class ContentEndpoint extends React.Component<Props, State> {

  static contextTypes = {
    endpoint: React.PropTypes.string,
  }

  context: Context

  render() {
    if (hasSkippedEndpoint()) {
      return (
        <div>
          I thought about it. It was a mistake. I want a GraphQL Endpoint...
          <a href={`https://github.com/login/oauth/authorize?client_id=${__GITHUB_OAUTH_CLIENT_ID__}&scope=user:email`}>
            Get GraphQL Endpoint
          </a>
        </div>
      )
    }

    if (this.context.endpoint) {
      return (
        <div>
          Congrats this is your endpoint:
          {this.context.endpoint}
        </div>
      )
    }

    return (
      <div>
        <a href={`https://github.com/login/oauth/authorize?client_id=${__GITHUB_OAUTH_CLIENT_ID__}&scope=user:email`}>
          Get GraphQL Endpoint
        </a>
        <button onClick={skipEndpoint}>Read on without GraphQL endpoint (non-interactive)</button>
      </div>
    )
  }
}
