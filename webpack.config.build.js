const webpack = require('webpack')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: ['whatwg-fetch', './src'],
    css: 'tachyons',
  },
  output: {
    path: './dist',
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
      loader: 'style!css?modules!postcss!stylus',
    }, {
      test: /module\.css/,
      loader: 'style!css?modules!postcss',
    }, {
      test: /\.css/,
      exclude: /module\.css/,
      loader: 'style!css!postcss',
    }, {
      test: /\.ts(x?)$/,
      loader: 'babel!ts',
      exclude: /node_modules/,
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
      __SEGMENT_TOKEN__: '"7Y6fdaghn7WfoaO3ICKYGDwuZHzV6C52"',
      __GITHUB_OAUTH_CLIENT_ID__: JSON.stringify(process.env.GITHUB_OAUTH_CLIENT_ID.toString()),
      __LAMBDA_AUTH__: JSON.stringify(process.env.LAMBDA_AUTH.toString()),
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
    }),
    new HtmlWebpackPlugin({
      favicon: 'static/favicon.png',
      template: 'src/index.html',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
      }
    }),
  ],
  postcss: [
    cssnano({
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 2 versions'],
      },
      discardComments: {
        removeAll: true,
      },
      safe: true,
    })
  ],
  svgo: {
    plugins: [
      {removeStyleElement: true},
    ],
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx'],
  }
}
