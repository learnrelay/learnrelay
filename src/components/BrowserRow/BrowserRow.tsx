import * as React from 'react'
import * as Relay from 'react-relay'

interface Props {
  pokemon: any
}

interface State {
  id: string
  name: string
  url: string
}

class BrowserRow extends React.Component<Props, State> {

  state = {
    id: this.props.pokemon.id,
    name: this.props.pokemon.name,
    url: this.props.pokemon.url,
  }

  render() {
    return (
      <div className='w-100 flex'>
        <input style={{minWidth: '20%'}} value={this.state.id} disabled/>
        <input style={{minWidth: '20%'}} value={this.state.name} disabled onChange={(e: any) => this.setState({name: e.target.value} as State)}/>
        <input style={{minWidth: '60%'}} value={this.state.url} disabled onChange={(e: any) => this.setState({url: e.target.value} as State)}/>
      </div>
    )
  }
}

export default Relay.createContainer(BrowserRow, {
  fragments: {
    pokemon: () => Relay.QL`
      fragment on Pokemon {
        id
        name
        url
      }
    `
  }
})
