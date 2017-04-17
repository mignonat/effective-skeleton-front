const config = require(__dirname+'/../shared/config.js')
const path = require('path')
config.setAbsRootPath(path.resolve("."))

const winston = require('winston')
const http = require("http")
const express = require('express')
const locale = require("locale")
const compression = require('compression')
const log = require(config.getAbsRootPath()+'/src/server/shared/log.js')
const Const = require(config.getAbsRootPath()+'/src/server/shared/const.js')
const locales = require(config.getAbsRootPath()+'/src/server/shared/locales.js')

const app = express()
app.use(locale(locales.getSupportedLocales()))

log.info('Starting on environment "'+config.get(Const.APP_ENV)+'"')

// Give access to assets directories
app.use(express.static('public'))

// Compress data to reduce network package size
app.use(compression())

const htmlDir = path.join(__dirname+'/../../../public/html/')

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


//TESTING
app.get("/locales", function(req, res) {
  res.header("Content-Type", "text/plain")
  res.send(
    "Our default is: " + locale.Locale["default"] + "\n" +
    "The best match is: " + req.locale + "\n"
  )
})


app.get('*', (req, res) => {
    try {
        res.redirect("/error-404")
    } catch (ex) { log.error('Redirect "*" to "/error-404" failed !') }
})

const port = config.get(Const.APP_PORT) || 8080
app.listen(port)
log.info('Listening on port '+port)