import * as React from 'react' // tslint:disable-line
import {Route, Redirect} from 'react-router'
import MarkdownPage from './pages/markdown/Markdown'
import App from './components/App/App'
import {subchapters} from './utils/content'
import {markAsRead} from './utils/viewtracker'

export default (
  <Route component={App}>
    <Redirect path='/' to='/overview/intro'/>
    <Route
      path='/:chapter/:subchapter'
      component={({ params }) => (
        <MarkdownPage params={params} ast={subchapters.find((s) => s.alias === params.subchapter)!.ast()} />
      )}
      onEnter={({ params }) => markAsRead(params.subchapter)}
    />
  </Route>
)
