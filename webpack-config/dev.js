const webpack = require('webpack')
const baseConfig = require('./base.js')

module.exports = Object.assign({ 
    devtool: 'eval'
}, baseConfig)