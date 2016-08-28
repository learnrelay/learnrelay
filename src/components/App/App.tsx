import * as React from 'react'
import {Link} from 'react-router'
import Icon from '../Icon/Icon'
import ServerLayover from '../ServerLayover/ServerLayover'
import {chapters, neighboorSubchapter, subchapters} from '../../utils/content'
import {collectHeadings, buildHeadingsTree} from '../../utils/markdown'
import {slug} from '../../utils/string'
import {hasRead} from '../../utils/viewtracker'

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

  constructor(props: Props) {
    super(props)

    this.state = {
      showLayover: false,
      endpoint: window.localStorage.getItem('graphcool_endpoint'),
    }
  }

  static childContextTypes = {
    endpoint: React.PropTypes.string,
  }

  getChildContext() {
    return {
      endpoint: this.state.endpoint,
    }
  }

  render() {
    const currentSubchapterAlias = this.props.params.subchapter
    const ast = subchapters.find((s) => s.alias === currentSubchapterAlias)!.ast()
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
                  <div
                    className='pb3'
                    key={subchapter.alias}
                  >
                    <span className='mr3 fw5 green'>{hasRead(subchapter.alias) ? '✓' : ''}</span>
                    <Link
                      to={`/${chapter.alias}/${subchapter.alias}`}
                      className='black fw3'
                    >
                      {subchapter.title}
                    </Link>
                    {chapter.alias === this.props.params.chapter &&
                    subchapter.alias === this.props.params.subchapter &&
                    headingsTree.map((h) => (
                      <a
                        key={h.title!}
                        className='flex flex-row pt2 flex-start black'
                        href={`#${slug(h.title!)}`}
                      >
                        <div className='ml4 mr2 fw5 bold o-20 black rotate-180 dib indent-char-dimensions'>¬</div>
                        <div>{h.title}</div>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div
            className='fixed bottom-0 left-0 flex fw3 items-center justify-center bg-accent pointer'
            style={{ width: 269, height: 90 }}
            onClick={() => this.setState({ showLayover: true } as State)}
          >
            <Icon
              src={require('../../assets/icons/graph-logo.svg')}
              width={22}
              height={24}
              className='pt1'
              color='#fff'
            />
            <span className='white f3 pl2'>GraphQL Server</span>
          </div>
        </div>
        <div className='w-80'>
          {this.props.children}
          {previousSubchapter &&
          <div className='fixed bottom-2 pa3 bg-gray'>
            <Link className='white' to={`/${previousSubchapter.chapter.alias}/${previousSubchapter.alias}`}>
              {previousSubchapter.title}
            </Link>
          </div>
          }
          {nextSubchapter &&
          <div className='fixed bottom-2 right-2 pa3 bg-accent'>
            <Link className='white' to={`/${nextSubchapter.chapter.alias}/${nextSubchapter.alias}`}>
              {nextSubchapter.title}
            </Link>
          </div>
          }
        </div>
        {this.state.showLayover && this.state.endpoint &&
        <ServerLayover
          endpoint={this.state.endpoint}
          close={() => this.setState({ showLayover: false } as State)}
        />
        }
      </div>
    )
  }
}