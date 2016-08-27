import * as React from 'react'
import {Parser, Node} from 'commonmark'
import Markdown from '../../components/Markdown/Markdown'

const parser = new Parser()

interface Props {
  children: Element
  params: any
}

interface State {
  ast: Node
}

export default class MarkdownPage extends React.Component<Props, State> {

  constructor (props: Props) {
    super(props)

    this.state = {
      ast: parser.parse(require(`../../../content/${props.params.chapter}/${props.params.subchapter}.md`)),
    }
  }

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
      <div
        className='flex'
      >
        <Markdown
          ast={this.state.ast}
          documentTitle={'Some'}
        />
      </div>
    )
  }
}
