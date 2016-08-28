# Get started

## Environment setup
In order to code along with the examples in this tutorial, here is the list of technologies that you need to install beforehand, if you did not install them yet, just follow the links provided below which will bring you to installation guides: 

- [Git](https://git-scm.com/downloads) - A distributed version control system that will help you follow along with this tutorial easier
- [Node v6.0+ and NPM](https://nodejs.org/en) - Node is a server-side platform built on top of [V8](https://developers.google.com/v8), we will use it to run our [Express](https://expressjs.com/) server using [Webpack dev server](https://webpack.github.io/docs/webpack-dev-server.html). On the other hands, NPM is short for Node Package Manager which is used to handle dependencies in the project

### Tools
- [graphql-config](https://github.com/graphcool/graphql-config) and [babel-plugin-react-relay](https://github.com/graphcool/babel-plugin-react-relay) -  Simple plug-ins to configure a GraphQL endpoint
- Editor integration (optional) 
    - [js-graphql-intellij-plugin](https://github.com/jimkyndemeyer/js-graphql-intellij-plugin) - GraphQL language support for IntelliJ IDEA and WebStorm, including Relay.QL tagged templates in JavaScript and TypeScript
    - [language-graphql](https://github.com/rmosolgo/language-graphql) - GraphQL support for Atom text editor

## How to follow along with this tutorial?

Each chapter is divided into two main parts - **Learning concepts and Practicing in real world application**. The former part will walk you through the concepts of Relay along with examples. The other will then let you apply your theory knowledge with our Pokedex application! 

> This guide is sprinkled with practice parts to let you get your hands dirty:

* Whenever a section is called **Step x**, get yourself ready for some coding action! At the start of each step you should checkout the matching git branch using **git checkout -f step-x** and then you can start working on the tasks described in the step!
* You can always use **git checkout -f step-x-solutions** to get a hint or two on how a solution could look like.
* Of course you can also go along with your own speed and disregard the branches we prepared. Whatever works best for you! 

<!-- __INJECT_GRAPHQL_ENDPOINT__ -->

## Step 1: Warm up

Normally, Relay requires you to set up a GraphQL server on your own. However, for the sake of convenience, we already prepared the GraphQL server and set it up properly for you! Therefore, you can start working on Relay without worrying about the GraphQL server.

It's time to get started! We will download our scaffolding project and make it up and running. 

```sh
$ curl -LOk https://our/path/to/pokedex.zip           // Download the Pokedex project
$ tar -zxvf pokedex.zip                               // Unzip the downloaded file
$ cd pokedex                                          // Change directory to the downloaded folder
$ git checkout -f step-1                              // Check out the first step
$ npm install                                         // Install all dependencies
$ npm start                                           // Start our server
```

Now, you should be able to visit http://localhost:3000 to see your beautiful Pokedex application, which looks like the following image:

// TODO Insert the image of the first page

Awesome! Let's move on!
