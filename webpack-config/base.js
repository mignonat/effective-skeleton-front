const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

const entryFilePath = './src/client/app.js'
const appDir = path.join(path.resolve('.'), '/public/js') // let as an absolute path
const assetsFromDir = './src/client/resources' // relative to this webpack config file path
const assetsToDir = '../' // relative to appDir

module.exports = {
  entry : entryFilePath,
  output: {
    path: appDir,
    filename: 'app.js'
  },
  module: {
    loaders: [{
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },{
        test: /\.vue$/,
        loader: 'vue'
      },{
        test: /\.css$/, 
        loader: "style-loader!css-loader"
    }]
  }/*,
  plugins : [
    new CopyWebpackPlugin([{
      from : assetsFromDir,
      to : assetsToDir
    }])
  ]*/
}