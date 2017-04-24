const webpack = require('webpack')
const baseConfig = require('./base.js')

module.exports = Object.assign({ 
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ]
}, baseConfig)