try {
  const reader = require('properties-reader')
  const properties = reader('./env.properties')
  var env = (properties)? properties.get('app.env') : 'development'
} catch (ex) {
    console.error("webpack.config : check env.properties file : "+ex)
}

env = env=='production'? 'prod' : 'dev'
console.info('Running webpack with env='+env)

module.exports = require('./webpack-config/'+env+'.js')