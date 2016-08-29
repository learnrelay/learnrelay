import * as React from 'react'
const styles: any = require('./LandingPage.module.styl')

interface Props {
  params: any
}

export default class LandingPage extends React.Component<Props, {}> {

  render() {
    return (
      <div className={styles.root}>
        <header>
          <h1>Learn Relay</h1>
          <h2>A comprehensive introduction to Relay</h2>
        </header>
        <dl className={styles.contents}>
          <dt>
            <h3>Overview</h3>
            <p>You have heard about Relay.js for a while but you are not quite sure what it really is, how it is useful, and how to start your first Relay application. If you have these questions in your mind, you come to the right place!</p>
          </dt>
          <dt>
            <h3>Introduction to Relay</h3>
            <p>You have heard about Relay.js for a while but you are not quite sure what it really is, how it is useful, and how to start your first Relay application. If you have these questions in your mind, you come to the right place!</p>
          </dt>
          <dt>
            <h3>Overview</h3>
            <p>You have heard about Relay.js for a while but you are not quite sure what it really is, how it is useful, and how to start your first Relay application. If you have these questions in your mind, you come to the right place!</p>
          </dt>
          <dt>
            <h3>Introduction to Relay</h3>
            <p>You have heard about Relay.js for a while but you are not quite sure what it really is, how it is useful, and how to start your first Relay application. If you have these questions in your mind, you come to the right place!</p>
          </dt>
        </dl>
        <div className={styles.start}>
          <button>Start interactive tutorial</button>
        </div>
      </div>
    )
  }
}
