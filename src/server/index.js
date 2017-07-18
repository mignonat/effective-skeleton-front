const config = require('./tool/config.js')
const path = require('path')
config.setAbsRootPath(path.resolve("."))

const http = require("http")
const express = require('express')
const locale = require("locale")
const compression = require('compression')
const bodyParser  = require('body-parser')

/** TOOLS */
const log = require('./tool/log.js')
const Const = require('./tool/const.js')
const locales = require('./tool/locales.js')
const api = require('./tool/api.js')
const error = require('./tool/error.js')

/** CONTROLLER */
const authentication = require('./controller/authentication.js')
const user_ctrl = require('./controller/user.js')

/** STARTING */
log.info('Starting on environment "'+config.get(Const.APP_ENV)+'"')

const app = express()
app.use(locale(locales.getSupportedLocales()))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public', { // Give access to assets directories
    index: false // to ignore serving static file index.html
}))
app.use(compression()) // Compress data to reduce network package size

/** SINGLE PAGE PAGES MAPPING */
const homePageFn = (req, res) => {
    try {
        log.debug('New request on url = "'+req.url+'"')
        res.sendFile(path.join(config.getAbsRootPath(), 'public/index.html'))
    }
    catch (ex) { log.error('homePageFn : '+ex) }
}
app.get('/', (req, res) => {
    try {
        log.debug('New request on /')
        res.redirect("/home")
    }
    catch (ex) { log.error('Redirect "/" to "/home" failed !') }
})
app.get('/home', homePageFn)
app.get('/contact', homePageFn)
app.get('/sample-component', homePageFn)
app.get('/sample-contextual-panel', homePageFn)
app.get('/sample-form', homePageFn)
app.get('/admin/batch', homePageFn)
app.get('/admin/maintenance', homePageFn)
app.get('/admin/logs', homePageFn)
app.get('/error', homePageFn)
app.get('/error-404', homePageFn)
app.get('/error-500', homePageFn)

/** AUTHENTICATION */
app.post(authentication.URL, authentication.ACTION)

/** USER */
app.post(user_ctrl.urls.USERS, user_ctrl[user_ctrl.actions.LIST])
app.delete(user_ctrl.urls.USER, user_ctrl[user_ctrl.actions.DELETE])

/*TESTING
app.get("/locales", function(req, res) {
  res.header("Content-Type", "text/plain")
  res.send(
    "Our default is: " + locale.Locale["default"] + "\n" +
    "The best match is: " + req.locale + "\n"
  )
})*/

app.get('*', (req, res) => {
    try {
        log.debug('front-app : url "'+req.url+'" not found')
        res.redirect("/error-404")
    } catch (ex) { log.error('Redirect "*" to "/error-404" failed !') }
})

const port = config.get(Const.APP_PORT) || 8080
app.listen(port)
log.info('Listening on port '+port)