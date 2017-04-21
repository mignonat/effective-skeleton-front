const path = require('path')

module.exports = {
  entry: './src/client/app.js',
  output: {
    path: path.resolve('.')+'/public/js/app',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  devtool: "source-map"
}