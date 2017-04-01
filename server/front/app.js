const winston = require('winston')
const express = require('express')
const path = require('path')
const compression = require('compression')
const fs = require( 'fs' )

const app = express()

//TODO create a node module to initialize the loggers and re-use them in all app files
//TODO create multiple logger (user, info, error) to dispatch in the correct file

var logger

if (process.env.NODE_ENV == 'production') {
    
    // Create log dir if not exist
    if (process.env.LOG_DIR) {
        const app_log_dir = path.join(__dirname+'/../../'+process.env.LOG_DIR)
        if (!fs.existsSync(app_log_dir))
            fs.mkdirSync(app_log_dir)
    }
        
    // PROD log level
    winston.level = 'info'

    const winston_transports = []
    if (process.env.INFO_FILE) {
        winston_transports.push(new (winston.transports.File)({
            name: 'info-file',
            filename: process.env.INFO_FILE,
            level: 'info'
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
        levels : { error: 0, warn: 1, user: 2, info: 3, verbose: 4, debug: 5 },
        transports : winston_transports
    })
} else {
    winston.level = 'debug'
    logger = new (winston.Logger)
}

logger.info('Starting on environment "'+process.env.NODE_ENV+'"')

// Give access to assets directories
app.use(express.static('public'))

// Compress data to reduce network package size
app.use(compression())

const htmlDir = path.join(__dirname+'/../../public/html/')

const homePageFn = (req, res) => {
    try {
        res.sendFile(htmlDir+'/index.html')
    }
    catch (ex) {
        error('Send file index.html file failed !')
    }
}

// Routes
app.get('/', (req, res) => {
    try {
        res.redirect("/home")
    }
    catch (ex) {
        error('Redirect "/" to "/home" failed !')
    }
})
app.get('/home', homePageFn)
app.get('/care', homePageFn)
app.get('/clean', homePageFn)
app.get('/wellbeing', homePageFn)
app.get('/testimony', homePageFn)
app.get('/contact', homePageFn)
app.get('/error', homePageFn)
app.get('/error-404', homePageFn)
app.get('*', (req, res) => {
    try {
        res.redirect("/error-404")
    }
    catch (ex) {
        error('Redirect "*" to "/error-404" failed !')
    }
})

app.listen(process.env.PORT)
logger.info('Listening on port '+process.env.PORT)
logger.log('user', 'test user')
logger.error('test erreur')