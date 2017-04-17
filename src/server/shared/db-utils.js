const mongoose = require('mongoose')
const config = require('./config.js')
const log = require(config.getAbsRootPath()+'/src/server/shared/log.js')
const Const = require(config.getAbsRootPath()+'/src/server/shared/const.js')

const dbUrl = config.get(Const.DB_URL)
const dbUser = config.get(Const.DB_USER)
const dbPassword = config.get(Const.DB_PASSWORD)

if (!dbUrl || !dbUser || !dbPassword) {
    log.error('db-utils module : missing param !')
    return
}

//TODO check properties parameters not null

mongoose.connect(dbUrl, {
    user: dbUser,
    pass: dbPassword
})

mongoose.connection.on('connected', function () {  
    log.info('Mongoose default connection open to '+dbUrl)
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