# Get started

In this chapter, we will set up our awesome Pokedex app. The first thing we need to do is to configure our environment, tools, and GraphQL endpoint. We will also see a guideline to follow along with this tutorial.

## Environment setup

In order to code along with the examples in this tutorial, here is the list of technologies that you need to install beforehand, if you did not install them yet, just follow the links provided below which will bring you to installation guides: 

#### [Git](https://git-scm.com/downloads) 

Git is a distributed version control system that developers use to track and share code. We will use a branch system provided by Git to follow each step in the tutorial, we will see how to use it in [How to follow along with this tutorial?](#how-to-follow-along-with-this-tutorial) section.

#### [Node v6.0+ and NPM](https://nodejs.org/en)

Node is a server-side platform built on top of [V8](https://developers.google.com/v8), we will use it to run our [Express](https://expressjs.com/) server using [Webpack dev server](https://webpack.github.io/docs/webpack-dev-server.html). On the other hands, NPM is short for Node Package Manager which is used to handle dependencies in the project.

### Tools
There are many Relay helper tools built by people from the open-source community. We will take a look at some of them which will be used in our project.

#### [graphql-config](https://github.com/graphcool/graphql-config) and [babel-plugin-react-relay](https://github.com/graphcool/babel-plugin-react-relay)
A simple plug-ins to configure a GraphQL endpoint. Basically, Relay requires a cached version of a schema in the JSON format, usually called `schema.json`. This allows Relay to convert `Relay.QL` from templates string to an immediately-invoked function without calling a GraphQL server, we will see how to use the `Relay.QL` in the [Containers and Fragments](/queries/containers-fragments) chapter, However, it means that we need to set up our back-end server to regenerate the `schema.json` every time our schema changed. This is where the `babel-plugin-react-relay` comes into play. It uses `graphql-config` behind the scene that allows us to setup a GraphQL endpoint in `package.json` and we are good to go! Let's consider the following example:

```json
  "graphql": {
    "request": {
      "url": "https://example.com/graphql"      # Provide a graphql endpoint
    }
  }
```

> graphql-config provides many options for setting up the endpoint, please consult the provided link above for more details.

#### Editor integration (Optional)

Most of the times, we need to work with `Relay.QL` which is a normal templates string. It has no syntax highlighting, code-formatting, and auto-completion. Luckily, there are some brilliant editor plug-ins providing these features.
- [js-graphql-intellij-plugin](https://github.com/jimkyndemeyer/js-graphql-intellij-plugin) - GraphQL language support for IntelliJ IDEA and WebStorm, including Relay.QL tagged templates in JavaScript and TypeScript
- [language-graphql](https://github.com/rmosolgo/language-graphql) - GraphQL support for Atom text editor

## How to follow along with this tutorial?

Each chapter is divided into two main parts - **Learning concepts and Practicing in real world application**. The former part will walk you through the concepts of Relay along with examples. The other will then let you apply your theory knowledge with our Pokedex application! 

> This guide is sprinkled with practice parts to let you get your hands dirty:

* Whenever a section is called **Step x**, get yourself ready for some coding action! At the start of each step you should checkout the matching git branch using **git checkout -f step-x** and then you can start working on the tasks described in the step!
* You can always use **git checkout -f step-x-solutions** to get a hint or two on how a solution could look like.
* Of course you can also go along with your own speed and disregard the branches we prepared. Whatever works best for you! 

## GraphQL Endpoint

Normally, Relay requires you to set up a GraphQL server on your own. However, for the sake of convenience, we already prepared the GraphQL server and set it up properly for you! Therefore, you can start working on Relay without worrying about the GraphQL server.

<!-- __INJECT_GRAPHQL_ENDPOINT__ -->
