import * as React from 'react'

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
    return (
      <div>
        {this.context.endpoint &&
        <div>
          Congrats this is your endpoint:
          {this.context.endpoint}
        </div>
        }
        {!this.context.endpoint &&
        <div>
          Get GraphQL Endpoint
        </div>
        }
      </div>
    )
  }
}
