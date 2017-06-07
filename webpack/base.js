const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

const entryFilePath = './src/client/app.js'
const appDir = path.join(path.resolve('.'), '/public/assets') // let as an absolute path
const assetsFromDir = './src/client/resource/html' // relative to this webpack config file path
const assetsToDir = '../' // relative to appDir

module.exports = {
  entry: {
    app : entryFilePath
  },
  output: {
    path: appDir,
    publicPath: 'assets/',
    filename: 'app.js'
  },
  module: {
    loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },{
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },{ 
        test: /\.(jpe?g|png|gif|svg|eot|woff|ttf|svg|woff2)$/, 
        loader: "file-loader?name=[name].[ext]"
      },{
        test: /\.css$/, 
        loader: "style-loader!css-loader",
        exclude: /node_modules/
      }]
  },
  plugins : [
    new CopyWebpackPlugin([{
      from : assetsFromDir,
      to : assetsToDir
    }])
  ]/*,
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }*/
}