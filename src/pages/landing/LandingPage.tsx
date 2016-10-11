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
            <p>Get a broad overview of the goals and prerequisites of this introduction to Relay and get to know the Pokedex app we will build together.</p>
          </dt>
          <dt>
            <h3>Introduction to Relay</h3>
            <p>Learn the basics of Relay and set up your environment for the following chapters. As Relay is a GraphQL client, this introduction focuses on the client side. You can use the included GraphQL backend to get the most out of this introduction and follow along in several practical steps that will lead to a fully functional Pokedex app!</p>
          </dt>
          <dt>
            <h3>Queries</h3>
            <p><b>Queries</b> are a central part of Relay as they are used to fetch data from the GraphQL server.
            Whenever we want to declare a data dependency in one of our React components, we have to wrap it with a <b>container</b>.
            Usually, you are building queries by combining <b>fragments</b> and using <b>query variables</b> to add additional flexibility.

            Combine these parts and get familiar with the Pokedex app by preparing things for the following chapters.</p>
          </dt>
          <dt>
            <h3>Connections</h3>
            <p>The terminology of Relay can be quite overwhelming in the beginning. That's why we take a closer look at <b>connections</b> in this chapter. We will learn what <b>nodes</b> and <b>edges</b> are, and how we can use them to traverse our <b>data graph</b>. We will get in touch with the powerful concept of <b>cursors</b> and <b>pagination</b> and instill some life in the Pokedex app by applying everything we learned so far.</p>
          </dt>
          <dt>
            <h3>Routes</h3>
            <p><b>Routes</b> are normal objects that declare root queries. Relay will aggregate the defined queries with fragments by using <b>Relay.Renderer</b> and send them to a remote server to fetch data.</p>
          </dt>
          <dt>
            <h3>Mutations</h3>
            <p>Learn how to delete or update your existing pokemons or even add new ones with <b>Mutations</b>! Mutations are the counterpart to queries, as they are used to modify or delete data. All mutations have to be dispatched using the <b>Relay.Store</b>. Get to know the different <b>Mutation Types</b> and use <b>Optimistic Updates</b> to provide an optimistic UI.</p>
          </dt>
        </dl>
        <div className={styles.start}>
          <Link to={`/${chapters[0].alias}/${chapters[0].subchapters[0].alias}`}>Start interactive tutorial</Link>
        </div>
      </div>
    )
  }
}
