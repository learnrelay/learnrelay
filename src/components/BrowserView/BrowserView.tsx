import * as React from 'react'
import * as Relay from 'react-relay'
import BrowserRow from '../BrowserRow/BrowserRow'

interface Props {
  viewer: any
}

class BrowserView extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        {this.props.viewer.allPokemons.edges.map((edge) => edge.node).map((node) => <BrowserRow key={node.id} pokemon={node}/>)}
      </div>
    )
  }
}

export default Relay.createContainer(BrowserView, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        allPokemons (first: 1000) {
          edges {
            node {
              id
              ${BrowserRow.getFragment('pokemon')}
            }
          }
        }
      }
    `,
  },
})
