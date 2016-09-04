# Get started

In this chapter, we will set up our awesome Pokedex app. The first thing we need to do is to configure our environment, tools, and GraphQL endpoint. We will also see a guideline to follow along with this tutorial.

## Environment setup

In order to code along with the examples in this tutorial, here is the list of technologies that you need to install beforehand. If you have not installed them yet, just follow the links provided below which will take you to the relevant installation guide:

#### [Git](https://git-scm.com/downloads)

Git is a distributed version control system that developers use to track and share code. We will use the branch system provided by Git to follow each step in the tutorial and we will see how to use it in the [How to follow along with this tutorial?](#how-to-follow-along-with-this-tutorial) section.

#### [Node v6.0+ and NPM](https://nodejs.org/en)

Node is a server-side platform built on top of [V8](https://developers.google.com/v8), we will use it to run our [Express](https://expressjs.com/) server using the [Webpack dev server](https://webpack.github.io/docs/webpack-dev-server.html). NPM is short for Node Package Manager which is used to handle the project's dependencies.

### Tools
There are many tools built by people from the open-source community that make developing applications with Relay easier. We use the ones below in our project.

#### [graphql-config](https://github.com/graphcool/graphql-config) and [babel-plugin-react-relay](https://github.com/graphcool/babel-plugin-react-relay)
Two simple plug-ins to configure a GraphQL endpoint. Essentially, Relay requires a cached version of a schema in the JSON format, usually called `schema.json`. This allows Relay to convert `Relay.QL` from a template string into an immediately-invoked function without calling a GraphQL server. We will see how to use the `Relay.QL` in the [Containers and Fragments](/queries/containers-fragments) chapter. However this means that we need to set up our back-end server to regenerate the `schema.json` every time our schema changed. This is where the `babel-plugin-react-relay` comes into play. It uses `graphql-config` behind the scene allowing us to setup a GraphQL endpoint in `package.json` and we are good to go! Let's consider the following example:

```json
  "graphql": {
    "request": {
      "url": "https://example.com/graphql"      # Provide a graphql endpoint
    }
  }
```

> graphql-config provides many options for setting up the endpoint, please consult the provided link above for more details.

#### Editor integration (Optional)

Most of the time, we need to work with `Relay.QL` which is a normal template string. It doesn't support syntax highlighting, code-formatting or auto-completion out of the box. Luckily, there are some brilliant editor plug-ins providing these features.
- [js-graphql-intellij-plugin](https://github.com/jimkyndemeyer/js-graphql-intellij-plugin) - GraphQL language support for IntelliJ IDEA and WebStorm, including Relay.QL tagged templates in JavaScript and TypeScript
- [language-graphql](https://github.com/rmosolgo/language-graphql) - GraphQL support for Atom text editor

## How to follow along with this tutorial?

Each chapter is divided into two main parts - **Learning concepts** and **Practicing in a real world application**. The former part will walk you through the concepts of Relay along with examples while the latter will let you apply your theoretical understanding with our Pokedex application!

> This guide is sprinkled with practice parts to let you get your hands dirty:

* Whenever a section is called **Step xy**, get yourself ready for some coding action! At the start of each step you should checkout the matching git branch using **git checkout -f step-xy** and then you can start working on the tasks described in the step!
* You can always use **git checkout -f step-xy-solutions** to get a hint or two on how a solution could look like.
* Of course you can also go along with your own speed and disregard the branches we prepared. Whatever works best for you!

## GraphQL Endpoint

Normally, Relay requires you to set up a GraphQL server on your own. However, for the sake of convenience, we already prepared the GraphQL server and set it up properly for you! This means you can start working on Relay without worrying about configuring your own GraphQL server.

<!-- __INJECT_GRAPHQL_ENDPOINT__ -->
