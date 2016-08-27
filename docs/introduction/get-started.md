# Get started

### Environment setup
In order to code along with the examples in this tutorial, here is the list of technologies that you need to install beforehand, if you did not install them yet, just follow the links provided below which will bring you to installation guides: 

- [Git](https://git-scm.com/downloads) - A distributed version control system that will help you follow along with this tutorial easier
- [Node v6.0+ and NPM](https://nodejs.org/en) - Node is a server-side platform built on top of [V8](https://developers.google.com/v8), we will use it to run our [Express](https://expressjs.com/) server using [Webpack dev server](https://webpack.github.io/docs/webpack-dev-server.html). On the other hands, NPM is short for Node Package Manager which is used to handle dependencies in the project

### Tools
- [graphql-config](https://github.com/graphcool/graphql-config) and [babel-plugin-react-relay](https://github.com/graphcool/babel-plugin-react-relay) -  Simple plug-ins to configure a GraphQL endpoint
- Editor integration (optional) 
    - [js-graphql-intellij-plugin](https://github.com/jimkyndemeyer/js-graphql-intellij-plugin) - GraphQL language support for IntelliJ IDEA and WebStorm, including Relay.QL tagged templates in JavaScript and TypeScript
    - [language-graphql](https://github.com/rmosolgo/language-graphql) - GraphQL support for Atom text editor

## How to follow along with this tutorial?

Each chapter is divided into two main parts - **Learning concepts and Practicing in real world application**. The first part will walk you through the concepts of Relay along with examples. The other will then let you apply your theory knowledge with our Pokedex application! 

> The Practicing part will be always named as **Step x**, where `x` is an integer started from 1-7. While following along with the tutorial, if you got struck with any chapter, you could check out at any point of the tutorial using **git checkout -f step-x**. In addition, you could also use **git checkout -f step-x-solutions** to see the end result of that step.

## Step 1: Warm up

Normally, Relay requires you to set up a GraphQL server on your own, however, for the sake of convenience, we already prepared the GraphQL server and set it up properly for you! Therefore, you can start working on Relay without worrying about GraphQL server.

It's time to get started! We will download our scaffolding project and make it up and running. 

```sh
$ curl -LOk https://our/path/to/pokedex               // Download the Pokedex project
$ cd pokedex                                          // Change directory to the downloaded folder
$ npm install                                         // Install all dependencies
$ npm start                                           // Start our server
```

Now, you should be able to visit http://localhost:3000 to see your beautiful Pokedex application, which looks like the following image:

// TODO Insert the image of the first page

Awesome! Let's move on!
