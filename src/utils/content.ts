import {Parser, Node} from 'commonmark'

class Chapter {
  title: string
  alias: string
  subchapters: Subchapter[]

  constructor(title: string, alias: string, subchaptersData: SubchapterData[]) {
    this.title = title
    this.alias = alias
    this.subchapters = subchaptersData.map((d) => new Subchapter(d.title, d.alias, this))
  }
}

interface SubchapterData {
  title: string
  alias: string
}

class Subchapter {
  title: string
  alias: string
  chapter: Chapter

  constructor(title: string, alias: string, chapter: Chapter) {
    this.title = title
    this.alias = alias
    this.chapter = chapter
  }

  ast(): Node {
    return parser.parse(require(`../../content/${this.chapter.alias}/${this.alias}.md`))
  }
}

const parser = new Parser()

export const chapters: Chapter[] = [
  new Chapter('Overview', 'overview', [{
    title: 'Brief Introduction',
    alias: 'intro',
  }, {
    title: 'Prerequisites',
    alias: 'prerequisites',
  }]),
  new Chapter('Introduction To Relay', 'introduction', [{
    title: 'What is Relay?',
    alias: 'what-is-relay',
  }, {
    title: 'Get Started',
    alias: 'get-started',
  }]),
  new Chapter('Queries', 'queries', [{
    title: 'What is a Query?',
    alias: 'what-is-a-query',
  }, {
    title: 'Containers and Fragments',
    alias: 'containers-fragments',
  }, {
    title: 'Working with Fragments',
    alias: 'working-with-fragments',
  }, {
    title: 'Variables',
    alias: 'variables',
  }]),
  new Chapter('Connections', 'connections', [{
    title: 'Terminology',
    alias: 'terminology',
  }, {
    title: 'Putting it all together',
    alias: 'putting-it-all-together',
  }, {
    title: 'Cursors and Pagination',
    alias: 'cursors-pagination',
  }]),
  new Chapter('Routes', 'routes', [{
    title: 'Route in Relay',
    alias: 'route-in-relay',
  }, {
    title: 'React Router Relay',
    alias: 'react-router-relay',
  }]),
  new Chapter('Mutations', 'mutations', [{
    title: 'What is a Muation?',
    alias: 'what-is-a-mutation',
  }, {
    title: 'Relay Store',
    alias: 'relay-store',
  }, {
    title: 'Mutation Types',
    alias: 'mutation-types',
  }, {
    title: 'Optimistic Updates',
    alias: 'optimistic-updates',
  }]),
  new Chapter('Go further', 'go-further', [{
    title: 'Wrapup',
    alias: 'wrapup',
  }]),
]

export const subchapters: Subchapter[] = chapters.map((c) => c.subchapters).reduce((acc, s) => acc.concat(s), [])

export function neighboorSubchapter(currentSubchapterAlias: string, forward: boolean): Subchapter | null {
  const currentIndex = subchapters.findIndex((s) => s.alias === currentSubchapterAlias)

  if (forward && currentIndex + 1 <= subchapters.length) {
    return subchapters[currentIndex + 1]
  } else if (!forward && currentIndex >= 1) {
    return subchapters[currentIndex - 1]
  }

  return null
}

export function getLastSubchapterAlias(subchapterAliases: string[]): string {
  let lastFinding = subchapterAliases[0]
  for (let i = 0; i < subchapters.length; i++) {
    if (subchapterAliases.includes(subchapters[i].alias)) {
      lastFinding = subchapters[i].alias
    }
  }
  return lastFinding
}
