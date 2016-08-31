import * as React from 'react'
import {Node} from 'commonmark'
import {hashLinkScroll} from '../../utils/dom'
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
      hashLinkScroll()
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.params.subchapter !== this.props.params.subchapter) {
      this.context.updateStoredState(['hasRead', this.props.params.subchapter], true)
    }
  }

  render() {
    return (
      <div style={{padding: '3rem 90px 6rem'}} >
        <Markdown
          ast={this.props.ast}
        />
      </div>
    )
  }
}
