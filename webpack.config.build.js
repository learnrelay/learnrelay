const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './src',
    tachyons: 'tachyons',
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
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      loader: 'ts',
    }, {
      test: /module\.css/,
      loader: 'style!css?modules',
    }, {
      test: /\.css/,
      exclude: /module\.css/,
      loader: 'style!css',
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
      __ENABLE_SEGMENT__: true,
      __SEGMENT_TOKEN__: '"M96lXuD90ZxkbQEQG716aySwBLllabOn"',
      __SMOOCH_TOKEN__: '"505tvtkv5udrd4kc5dbpppa6x"',
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
  svgo: {
    plugins: [
      {removeStyleElement: true},
    ],
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx'],
  }
}
