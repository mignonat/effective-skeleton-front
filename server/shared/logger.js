const winston = require('winston')
const fs = require('fs')
const path = require('path')

var logger
if (process.env.LOG_FILE) {
    
    var app_log_dir = __dirname ;

    // Create log dir if not exist
    if (process.env.LOG_DIR) {
        app_log_dir = path.join(__dirname+'/../../'+process.env.LOG_DIR)
        if (!fs.existsSync(app_log_dir))
            fs.mkdirSync(app_log_dir)
    }
        

    //TODO TO BE CONTINUED HERE


    // PROD log level
    winston.level = 'info'

    const winston_transports = []
    if (process.env.LOG_FILE) {
        winston_transports.push(new (winston.transports.File)({
            name: 'log-file',
            filename: process.env.LOG_FILE,
            level: process.env.LOG_LEVEL
        }))
    }
    
    if (process.env.USER_FILE) {
        winston_transports.push(new (winston.transports.File)({
            name: 'user-file',
            filename: process.env.USER_FILE,
            level: 'user'
        }))
    }
    
    if (process.env.ERROR_FILE) {
        winston_transports.push(new (winston.transports.File)({
            name: 'error-file',
            filename: process.env.ERROR_FILE,
            level: 'error'
        }))
    }
    logger = new (winston.Logger)({
        transports : winston_transports
    })
} else {
    winston.level = 'debug'
    logger = new (winston.Logger)
}

module.exports = {
    log : (level, msg) => {
        logger.log(level, msg)
    },
    info : (msg) => {
        logger.info(msg)
    },
    error : (msg) => {
        logger.error(msg)
    },
    user : (msg) => {
        //todo log in user file
    }
}
