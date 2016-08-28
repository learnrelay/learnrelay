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
    title: 'Prerequisits',
    alias: 'prerequisits',
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
    alias: 'containers-fragements',
  }]),
]
