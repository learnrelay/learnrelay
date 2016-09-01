import * as React from 'react'

const styles: any = require('./Sharing.module.styl')

interface Props {
}

interface State {
}

export default class Sharing extends React.Component<Props, State> {

  render() {
    const shareTitle = 'I just learned how to develop apps with Relay and GraphQL'
    const shareUrl = encodeURIComponent(window.location.origin)

    return (
      <div className='db'>
        <h1 style={{
          fontWeight: 300,
          color: 'rgb(242, 107, 0)',
          paddingTop: 30,
          paddingBottom: '0.92rem',
          marginTop: 'calc(2.3rem - 30px)',
          marginBottom: '1.6rem',
          borderBottom: '1px solid rgba(0, 0, 0, 0.0980392)',
        }}>
          You did it! Well done!
        </h1>
        <p>
          We hope you enjoyed learning Relay.
          We put a lot of work into these resources and hope to reach as many developers as possible.
          You can help us by sharing it:
        </p>
        <div
          className='flex justify-center'
          style={{
            borderBottom: '1px solid rgba(0, 0, 0, 0.0980392)',
            paddingBottom: '2rem',
            marginBottom: '2rem',
          }}
        >
          <a
            href={`http://www.twitter.com/share?url=${shareUrl}&text=${shareTitle}`}
            target='_blank'
            className={styles.button}
            style={{background: '#3cf'}}
          >
            Share on Twitter
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&t=${shareTitle}`}
            target='_blank'
            className={`ml2 ${styles.button}`}
            style={{background: '#3b5998'}}
          >
            Share on Facebook
          </a>
        </div>
        <p>
          If you need further help with Relay or have any other questions, come and join our Slack:
        </p>
        <div
          className='flex justify-center'
          style={{
            marginBottom: '2rem',
          }}
        >
          <input
            value='mikehunt@gmail.com'
            className={styles.mail}
          />
          <button className={styles.slackButton}>
            <img src={require('../../assets/images/slack_logo.png')}/>
            Join Slack
          </button>
        </div>
      </div>
    )
  }
}
