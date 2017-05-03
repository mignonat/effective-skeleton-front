const CopyWebpackPlugin = require('copy-webpack-plugin')
const IconfontWebpackPlugin = require('iconfont-webpack-plugin')
const path = require('path')

const entryFilePath = './src/client/app.js'
const appDir = path.join(path.resolve('.'), '/public/assets') // let as an absolute path
const assetsFromDir = './src/client/resources/html' // relative to this webpack config file path
const assetsToDir = '../' // relative to appDir

module.exports = {
  entry : entryFilePath,
  output: {
    path: appDir,
    publicPath: 'assets/',
    filename: 'app.js'
  },
  module: {
    loaders: [{
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },{
        test: /\.vue$/,
        loader: 'vue',
        exclude: /node_modules/
      },{
        test: /\.css$/, 
        loader: "style-loader!css-loader!postcss-loader",
        exclude: /node_modules/
      },{
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/, 
        loader: "file",
        exclude: /node_modules/
    }]
  },
  plugins : [
    new CopyWebpackPlugin([{
      from : assetsFromDir,
      to : assetsToDir
    }]),
    new IconfontWebpackPlugin()
  ]
}