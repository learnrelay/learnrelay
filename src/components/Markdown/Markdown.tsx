import * as React from 'react'
import {Node} from 'commonmark'
import * as ReactRenderer from 'commonmark-react-renderer'
import * as slug from 'slug'
import {PrismCode} from 'react-prism'

const styles: any = require('./Markdown.module.css')

interface Props {
  ast: Node
  documentTitle: string
}

function childrenToString(children): string {
  if (typeof children === 'string') {
    return children
  }

  return children
    .map((el) => {
      if (typeof el === 'string') {
        return el
      } else {
        return childrenToString(el.props.children)
      }
    })
    .join('')
}

export default class Markdown extends React.PureComponent<Props, {}> {

  _openChat(message: string) {
    analytics.track('documenation help: open chat', {message})

    if (!Smooch.isOpened()) {
      Smooch.open()
    }

    if (!window.localStorage.getItem('chat_initiated')) {
      Smooch.sendMessage(`Hey! Can you help me with this part of the ${this.props.documentTitle} docs?`)
        .then(() => Smooch.sendMessage(message.substr(0, 200) + '...'))
        .then(() => window.localStorage.setItem('chat_initiated', 'true'))
    }
  }

  render() {
    const context = this
    const renderers = {
      Heading (props) {
        const padding = {
          1: () => 2.3,
          2: () => 1.5,
          3: () => 1.3,
          4: () => 1.2,
          5: () => 1,
        }[props.level]()
        const elProps = {
          key: props.nodeKey,
          id: slug(childrenToString(props.children), {lower: true}),
          style: {
            fontWeight: 300,
            color: '#F26B00',
            paddingTop: 100,
            paddingBottom: `${padding * 0.4}rem`,
            marginTop: `calc(${padding}rem - 100px)`,
            marginBottom: '1.6rem',
            borderBottom: 'solid rgba(0,0,0,0.1) 1px',
          },
        }
        return React.createElement('h' + props.level, elProps, props.children)
      },
      Paragraph (props) {
        return (
          <div className={styles.paragraph}>
            <p>{props.children}</p>
            <div className={styles.helpWrapper}>
              <div className={styles.help} onClick={() => context._openChat(childrenToString(props.children))}>?</div>
            </div>
          </div>
        )
      },
      List (props) {
        return (
          <div className={styles.paragraph}>
            {ReactRenderer.renderers.List(props)}
            <div className={styles.helpWrapper}>
              <div className={styles.help} onClick={() => context._openChat(childrenToString(props.children))}>?</div>
            </div>
          </div>
        )
      },
      CodeBlock (props) {
        const className = props.language && 'language-' + props.language
        return (
          <pre>
            <PrismCode className={className}>
              {props.literal}
            </PrismCode>
          </pre>
        )
      },
    }

    const transformImageUri = (uri: string) => {
      if (uri.substr(0, 4) === 'http') {
        return uri
      }
      const filename = uri.replace(/.*\//, '').replace('.png', '')
      return require(`../../../content/images/${filename}.png`)
    }

    const renderer = new ReactRenderer({
      renderers,
      transformImageUri,
    })

    return (
      <div className={`relative pa6 ${styles.content}`}>
        <div className='absolute right-0 ph4 black gray-2 f6 tr' style={{ top: '2.3rem' }}>
          Last updated<br />
          {__LAST_UPDATE__}
        </div>
        {renderer.render(this.props.ast)}
      </div>
    )
  }
}
