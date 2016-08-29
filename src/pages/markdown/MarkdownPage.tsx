import * as React from 'react'
import {Node} from 'commonmark'
import Markdown from '../../components/Markdown/Markdown'

interface Props {
  params: any
  ast: Node
}

interface Context {
  updateStoredState: (keyPath: string[], value: any) => void
}

export default class MarkdownPage extends React.Component<Props, {}> {

  static contextTypes = {
    updateStoredState: React.PropTypes.func.isRequired,
  }

  context: Context

  componentDidMount() {
    this.context.updateStoredState(['hasRead', this.props.params.subchapter], true)

    if (window.location.hash !== '') {
      const el = document.getElementById(window.location.hash.substr(1))
      if (el) {
        setTimeout(() => window.scrollTo(0, el.offsetTop), 100)
      }
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.params.subchapter !== this.props.params.subchapter) {
      this.context.updateStoredState(['hasRead', this.props.params.subchapter], true)
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
