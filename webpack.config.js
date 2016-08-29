const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: ['whatwg-fetch', './src'],
    css: 'tachyons',
  },
  output: {
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  module: {
    preLoaders: [{
      test: /\.ts(x?)$/,
      loader: 'tslint',
      exclude: /node_modules/,
    }],
    loaders: [{
      test: /module\.styl/,
      loader: 'style!css?modules!stylus',
    }, {
      test: /module\.css/,
      loader: 'style!css?modules',
    }, {
      test: /\.css/,
      exclude: /module\.css/,
      loader: 'style!css',
    }, {
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      loaders: ['babel', 'ts']
    }, {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
    }, {
      test: /\.json/,
      loader: 'json',
    }, {
      test: /\.(jpg|png)/,
      loader: 'file',
    }, {
      test: /content\/.*\.svg$/,
      loader: 'file',
    }, {
      test: /icons\/.*\.svg$/,
      loader: 'raw!svgo?{"plugins":[{"removeStyleElement":true}]}',
    }, {
      test: /\.md/,
      loader: 'raw',
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      __LAST_UPDATE__: '"' + new Date().toLocaleDateString() + '"',
      __ENABLE_SEGMENT__: false,
      __SEGMENT_TOKEN__: '"mxShPAuQCvtbX7K1u5xcmFeqz9X7S7HN"',
      __GITHUB_OAUTH_CLIENT_ID__: '"b4ee20bd611665a7c729"',
      __LAMBDA_AUTH__: '"https://73zvpdo0k5.execute-api.eu-west-1.amazonaws.com/prod/lambda-learnrelay_auth_dev"',
    }),
    new HtmlWebpackPlugin({
      favicon: 'static/favicon.png',
      template: 'src/index.html',
    }),
  ],
  svgo: {
    plugins: [
      {removeStyleElement: true},
    ],
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx'],
  },
}
