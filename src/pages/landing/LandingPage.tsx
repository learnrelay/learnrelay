import * as React from 'react'
import {Link} from 'react-router'
import {chapters} from '../../utils/content'
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
            <h3>Queries</h3>
            <p>You have heard about Relay.js for a while but you are not quite sure what it really is, how it is useful, and how to start your first Relay application. If you have these questions in your mind, you come to the right place!</p>
          </dt>
          <dt>
            <h3>Connections</h3>
            <p>You have heard about Relay.js for a while but you are not quite sure what it really is, how it is useful, and how to start your first Relay application. If you have these questions in your mind, you come to the right place!</p>
          </dt>
          <dt>
            <h3>Routes</h3>
            <p>You have heard about Relay.js for a while but you are not quite sure what it really is, how it is useful, and how to start your first Relay application. If you have these questions in your mind, you come to the right place!</p>
          </dt>
          <dt>
            <h3>Mutations</h3>
            <p>You have heard about Relay.js for a while but you are not quite sure what it really is, how it is useful, and how to start your first Relay application. If you have these questions in your mind, you come to the right place!</p>
          </dt>
          <dt>
            <h3>Go further</h3>
            <p>You have heard about Relay.js for a while but you are not quite sure what it really is, how it is useful, and how to start your first Relay application. If you have these questions in your mind, you come to the right place!</p>
          </dt>
        </dl>
        <div className={styles.start}>
          <Link to={`/${chapters[0].alias}/${chapters[0].subchapters[0].alias}`}>Start interactive tutorial</Link>
        </div>
      </div>
    )
  }
}
