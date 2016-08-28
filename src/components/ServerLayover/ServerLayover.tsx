import * as React from 'react'
import * as GraphiQL from 'graphiql'

require('graphiql/graphiql.css')

interface Props {
  endpoint: string
  close: () => void
}

interface State {
  showData: boolean
}

export default class ServerLayover extends React.Component<Props, State> {

  state = {
    showData: false,
  }

  render() {
    const graphQLFetcher = (graphQLParams) => {
      return fetch(this.props.endpoint, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(graphQLParams),
      })
        .then(response => response.json())
    }

    return (
      <div className='fixed bottom-0 w-100 bg-gray-2' style={{ height: 350 }}>
        <div className='flex justify-between bg-accent' style={{ height: 70 }}>
          <div className='flex pt2'>
            <div
              className={`h-100 f4 flex items-center ph3 mh2 ${this.state.showData ? 'bg-gray-2 accent' : 'white'} `}
              onClick={() => this.setState({ showData: true } as State)}
            >
              Data Browser
            </div>
            <div
              className={`h-100 f4 flex items-center ph3 mh2 ${!this.state.showData ? 'bg-gray-2 accent' : 'white'} `}
              onClick={() => this.setState({ showData: false } as State)}
            >
              GraphiQL
            </div>
          </div>
          <div className='flex p3'>
            API Endpoint
            <strong>{this.props.endpoint}</strong>
            <div
              className='white f2 pointer'
              onClick={this.props.close}
            >
              X
            </div>
          </div>
        </div>
        {this.state.showData &&
          <div>Aaaaaall the data.</div>
        }
        {!this.state.showData &&
          <GraphiQL fetcher={graphQLFetcher} />
        }
      </div>
    )
  }
}
