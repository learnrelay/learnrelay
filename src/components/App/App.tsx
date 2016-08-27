import * as React from 'react'
import {Link} from 'react-router'

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
        <div className='w-20 flex flex-column'>
          Overview
          <Link to='/overview/intro'>Intro</Link>
          <Link to='/overview/prerequisites'>Prerequisites</Link>
          Introduction
          <Link to='/introduction/what-is-relay'>What is Relay?</Link>
          <Link to='/introduction/get-started'>Get Started</Link>
        </div>
        <div className='w-80'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
