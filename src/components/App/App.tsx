import * as React from 'react'
import {Link} from 'react-router'
import Icon from '../Icon/Icon'

require('./style.css')

interface Props {
  children: React.ReactElement<any>
  params: any
}

interface State {
}

export default class App extends React.Component<Props, State> {

  render() {
    return (
      <div className='flex'>
        <div className='w-20 pa4 flex flex-column vertical-line'>
          <h2 className="fw3 pb4">
            <Icon
              src={require('../../assets/icons/logo.svg')}
              width={22}
              height={13}
            />
            Learn Relay
          </h2>
          <span className="fw6 pb3"><span className="mr3">1</span> Overview</span>
          <Link className="pb3 fw3" to='/overview/intro'><span className="mr3 fw5 c">✓</span> Intro</Link>
          <Link className="pb3 fw3" to='/overview/prerequisites'><span className="mr3 fw5">✓</span> Prerequisites</Link>

          {
            // Introduction to relay
            // <Link to='/introduction/what-is-relay'>What is Relay?</Link>
            // <Link to='/introduction/get-started'>Get Started</Link>
            // Queries
            // <Link to='/introduction/get-started'>What is a query</Link>
            // <Link to='/introduction/get-started'>Containers</Link>
            //
            // Connections
            // Routes
            // Mutations
            // Go Furthrer
          }
        </div>
        <div className='w-80'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
