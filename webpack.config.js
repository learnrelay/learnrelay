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
    rules: [{
      enforce: 'pre',
      test: /\.ts(x?)$/,
      loader: 'tslint-loader',
      exclude: /node_modules/,
    }, {
      test: /module\.styl/,
      loader: 'style-loader!css-loader?modules!stylus-loader',
    }, {
      test: /module\.css/,
      loader: 'style-loader!css-loader?modules',
    }, {
      test: /\.css/,
      exclude: /module\.css/,
      loader: 'style-loader!css-loader',
    }, {
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      loader: 'babel-loader!awesome-typescript-loader',
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.json/,
      loader: 'json-loader',
    }, {
      test: /\.(jpg|png)/,
      loader: 'file-loader',
    }, {
      test: /content\/.*\.svg$/,
      loader: 'file-loader',
    }, {
      test: /icons\/.*\.svg$/,
      loader: 'raw-loader!svgo-loader?{"plugins":[{"removeStyleElement":true}]}',
    }, {
      test: /\.md/,
      loader: 'raw-loader',
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      __LAST_UPDATE__: '"' + new Date().toLocaleDateString() + '"',
      __ENABLE_SEGMENT__: false,
      __SEGMENT_TOKEN__: '"7Y6fdaghn7WfoaO3ICKYGDwuZHzV6C52"',
      __GITHUB_OAUTH_CLIENT_ID__: '"b4ee20bd611665a7c729"',
      __LAMBDA_AUTH__: '"https://56gi2jy2x0.execute-api.eu-west-1.amazonaws.com/dev/"',
    }),
    new HtmlWebpackPlugin({
      favicon: 'static/favicon.png',
      template: 'src/index.html',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        svgo: {
          plugins: [
            {removeStyleElement: true},
          ],
        },
      }
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
}
