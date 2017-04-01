const winston = require('winston')
const express = require('express')
const path = require('path')
const compression = require('compression')
const logger = require('../shared/logger.js')

const app = express()

//TODO create a node module to initialize the loggers and re-use them in all app files
//TODO create multiple logger (user, info, error) to dispatch in the correct file

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