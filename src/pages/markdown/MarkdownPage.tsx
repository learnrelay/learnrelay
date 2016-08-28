import * as React from 'react'
import {Node} from 'commonmark'
import Markdown from '../../components/Markdown/Markdown'

interface Props {
  params: any
  ast: Node
}

export default class MarkdownPage extends React.Component<Props, {}> {

  componentDidMount() {
    if (window.location.hash !== '') {
      const el = document.getElementById(window.location.hash.substr(1))
      if (el) {
        setTimeout(() => window.scrollTo(0, el.offsetTop), 100)
      }
    }
  }

  render() {
    return (
      <div>
        <Markdown ast={this.props.ast}/>
      </div>
    )
  }
}
