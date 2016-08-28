import * as React from 'react'
const styles: any = require('./LandingPage.module.css')

interface Props {
  params: any
}

export default class LandingPage extends React.Component<Props, {}> {

  render() {
    return (
      <div className={styles.root}>
        Welcome to Learn Relay
      </div>
    )
  }
}
