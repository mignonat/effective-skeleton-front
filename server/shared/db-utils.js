const mongoose = require('mongoose')
const config = require('./config.js')
const log = require(config.get('abs-root-path')+'/server/shared/log.js')

config.set('token-secret', 'JSONWebTokenSecretToChange!')
config.set('db_url', 'mongodb://localhost:12345/back-app')
config.set('db_user', 'back-app')
config.set('db_password', 'abc123')

mongoose.connect(config.get('db_url'), {
    user: config.get('db_user'),
    pass: config.get('db_password')
})

mongoose.connection.on('connected', function () {  
    log.info('Mongoose default connection open to ' + config.get('db_url'))
})

mongoose.connection.on('error', function (err) {  
    log.error('Mongoose default connection error: ' + err)
})

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
    log.error('Mongoose default connection disconnected')
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
    mongoose.connection.close(function () { 
        log.info('Mongoose default connection disconnected through app termination')
            process.exit(0)
    })
})