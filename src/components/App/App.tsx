import * as React from 'react'
import {Link} from 'react-router'
import Icon from '../Icon/Icon'
import ServerLayover from '../ServerLayover/ServerLayover'
import {chapters} from '../../utils/content'
import {collectHeadings, buildHeadingsTree} from '../../utils/markdown'

require('./style.css')

interface Props {
  children: React.ReactElement<any>
  params: any
}

interface State {
  showLayover: boolean
  endpoint: string | null
}

export default class App extends React.Component<Props, State> {

  static childContextTypes = {
    endpoint: React.PropTypes.string,
  }

  state = {
    showLayover: false,
    endpoint: 'https://api.graph.cool/relay/v1/cis4fgtjc0edy0143nj3dfuj9',
  }

  getChildContext() {
    return {
      endpoint: this.state.endpoint,
    }
  }

  render() {
    const ast = chapters
      .find((c) => c.alias === this.props.params.chapter)
      .subchapters
      .find((s) => s.alias === this.props.params.subchapter)
      .ast()
    const headings = collectHeadings(ast)
    const headingsTree = buildHeadingsTree(headings)

    return (
      <div className='flex'>
        <div className='w-20 pa4 flex flex-column vertical-line min-width-270 font-small'>
          <h2 className='fw3 pb4'>
            <span className='dib mr3 mrl-1'><Icon
              src={require('../../assets/icons/logo.svg')}
              width={22}
              height={13}
            /></span>
            Learn Relay
          </h2>
          {chapters.map((chapter, index) => (
            <div
              className='flex flex-column'
              key={chapter.alias}
            >
              <Link
                className='fw6 pb3 black'
                to={`/${chapter.alias}/${chapter.subchapters[0].alias}`}
              >
                <span className='mr3 o-20 bold'>{index + 1}</span> {chapter.title}
              </Link>
              {chapter.subchapters.map((subchapter) => (
                <Link
                  className='pb3 fw3 black'
                  to={`/${chapter.alias}/${subchapter.alias}`}
                  key={subchapter.alias}
                >
                  <span className='mr3 fw5 o-20 bold'>✓</span> {subchapter.title}
                  {chapter.alias === this.props.params.chapter &&
                  subchapter.alias === this.props.params.subchapter &&
                  headingsTree.map((h) => (
                    <div key={h.title!}>
                      <span className='ml4 mr2 fw5 bold o-20 black rotate-180 dib'>¬</span>
                      {h.title}
                    </div>
                  ))}

                  {
                    //<span className='mr3 fw5 bold green'>✓</span> {subchapter.title}
                    //<span className='ml4 mr2 fw5 bold o-20 black rotate-180 dib'>¬</span> {subchapter.title}
                  }


                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className='w-80'>
          {this.props.children}
        </div>
        {this.state.showLayover &&
        <ServerLayover
          endpoint={this.state.endpoint}
          close={() => this.setState({ showLayover: false } as State)}
        />
        }
      </div>
    )
  }
}
