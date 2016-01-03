var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event; //To know whether it is start or build
process.env.BABEL_ENV = TARGET; //To communicate with babelrc

//path uses nodeJS default path method
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
}

const common = {
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
    {
      test:/\.scss$/,
      loaders: ['style', 'css', 'sass'],
      include: PATHS.app
    },
    {
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: PATHS.app
    }
    ]
  },
  plugins: [
  new HtmlwebpackPlugin({
    template: 'node_modules/html-webpack-template/index.html',
    title: 'Your App',
    appMountId: 'app'
  })
  ]
}

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',

      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'eval-source-map'
  });
}

if (TARGET === 'build') {
  module.exports = merge(common, {})
}
