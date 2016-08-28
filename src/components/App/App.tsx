import * as React from 'react'
import {Link} from 'react-router'
import Icon from '../Icon/Icon'
import ServerLayover from '../ServerLayover/ServerLayover'
import {chapters, neighboorSubchapter, subchapters} from '../../utils/content'
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
    const currentSubchapterAlias = this.props.params.subchapter
    const ast = subchapters.find((s) => s.alias === currentSubchapterAlias).ast()
    const headings = collectHeadings(ast)
    const headingsTree = buildHeadingsTree(headings)

    const nextSubchapter = neighboorSubchapter(currentSubchapterAlias, true)
    const previousSubchapter = neighboorSubchapter(currentSubchapterAlias, false)

    return (
      <div className='flex row-reverse'>
        <div
          className='pa4 pb6 flex flex-column vertical-line font-small fixed left-0 h-100 overflow-y-scroll'
          style={{ width: 270 }}
        >
          <div>
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
                    <span className='mr3 fw5 green'>✓</span> {subchapter.title}
                    {chapter.alias === this.props.params.chapter &&
                    subchapter.alias === this.props.params.subchapter &&
                    headingsTree.map((h) => (
                      <div className='flex flex-row pt2 flex-start' key={h.title!}>
                        <div className='ml4 mr2 fw5 bold o-20 black rotate-180 dib indent-char-dimensions'>¬</div>
                        <div>{h.title}</div>
                      </div>
                    ))}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div
            className='fixed bottom-0 left-0 flex fw3 items-center justify-center bg-white pointer'
            style={{ width: 269, height: 90 }}
            onClick={() => this.setState({ showLayover: true } as State)}
          >
            <Icon
              src={require('../../assets/icons/graph-logo.svg')}
              width={22}
              height={24}
              className='pt1'
            />
            <span className='accent f3 pl2'>GraphQL Server</span>
          </div>
        </div>
        <div className='w-80'>
          {this.props.children}
          {previousSubchapter &&
          <div className='fixed bottom-0 left-0 bg-gray'>
            <Link to={`/${previousSubchapter.chapter.alias}/${previousSubchapter.alias}`}>
              {previousSubchapter.title}
            </Link>
          </div>
          }
          {nextSubchapter &&
          <div className='fixed bottom-0 right-0 bg-accent'>
            <Link to={`/${nextSubchapter.chapter.alias}/${nextSubchapter.alias}`}>
              {nextSubchapter.title}
            </Link>
          </div>
          }
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
