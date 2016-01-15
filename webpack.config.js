var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  entry: ["babel-polyfill", "./index.js"],
  output: {
      path: "dist",
      filename: "bundle.js"
  },
  module : {
    loaders: [ {
        test   : /.js$/,
        loader : 'babel-loader',
        exclude: /node_modules/,
        query  : {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new WebpackNotifierPlugin(),
  ]
}