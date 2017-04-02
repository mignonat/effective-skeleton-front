const winston = require('winston')
const express = require('express')
const path = require('path')
const compression = require('compression')
const log = require('../shared/log.js')

const app = express()

log.info('Starting on environment "'+process.env.NODE_ENV+'"')

// Give access to assets directories
app.use(express.static('public'))

// Compress data to reduce network package size
app.use(compression())

const htmlDir = path.join(__dirname+'/../../public/html/')

const homePageFn = (req, res) => {
    try {
        log.debug('New request on url = "'+req.url+'"')
        res.sendFile(htmlDir+'/index.html')
    }
    catch (ex) { log.error('Send file index.html file failed !') }
}

// Routes
app.get('/', (req, res) => {
    try {
        res.redirect("/home")
    }
    catch (ex) { log.error('Redirect "/" to "/home" failed !') }
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
    catch (ex) { log.error('Redirect "*" to "/error-404" failed !') }
})

app.listen(process.env.PORT)
log.info('Listening on port '+process.env.PORT)