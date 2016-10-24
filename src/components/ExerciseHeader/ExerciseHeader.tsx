import * as React from 'react'

// const styles: any = require('./ExerciseHeader.module.styl')

interface Props {
  title: string
}

interface State {
}

export default class ContentEndpoint extends React.Component<Props, State> {

  render() {
    return null // TODO @julianbauer remove this and uncomment h2

//    return (
//      <h2>
//        {this.props.title}
//      </h2>
//    )
  }
}
