/**
 * Logging interface
 */
const winston = require('winston')
const fs = require('fs')
const path = require('path')
const config = require('./config.js')
const Const = require('./const.js')

// Check log dir
var app_log_dir = '' /*config.getAbsRootPath()+'/'*/, app_logger, custom_logger
if (config.get(Const.LOG_DIR)) {
    app_log_dir = path.join(app_log_dir+config.get(Const.LOG_DIR))
    if (!fs.existsSync(app_log_dir))
        fs.mkdirSync(app_log_dir) // create missing log directory
}

// App log logger
const log_app_level = config.get(Const.LOG_APP_LEVEL) || 'info'
if (config.get(Const.LOG_APP_FILE)) {
    app_logger = new (winston.Logger)({
        transports : [
            new (winston.transports.File)({
                name: 'log-file',
                filename: app_log_dir+'/'+config.get(Const.LOG_APP_FILE),
                level: log_app_level
            })
        ]
    })
} else {
    winston.level = log_app_level
    app_logger = winston
}

// Custom logger
if (config.get(Const.LOG_CUSTOM_FILE)) {
    custom_logger = new (winston.Logger)({
        transports : [
            new (winston.transports.File)({
                name: 'custom-file',
                filename: app_log_dir+'/'+config.get(Const.LOG_CUSTOM_FILE),
                level: (config.get(Const.LOG_CUSTOM_LEVEL))? config.get(Const.LOG_CUSTOM_LEVEL) : 'info'
            })
        ]
    })
} 
else
    custom_logger = winston

module.exports = {
    // App logger
    info : (msg) => {
        app_logger.info(msg)
    },
    error : (msg) => {
        app_logger.error(msg)
    },
    warn : (msg) => {
        app_logger.warn(msg)
    },
    debug : (msg) => {
        app_logger.debug(msg)
    },
    // Custom logger
    info_custom : (msg) => {
        custom_logger.info(msg)
    },
    error_custom : (msg) => {
        custom_logger.error(msg)
    },
    warn_custom : (msg) => {
        custom_logger.warn(msg)
    },
    debug_custom : (msg) => {
        custom_logger.debug(msg)
    }
}
