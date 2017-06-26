const config = require(__dirname+'/../shared/config.js')
const path = require('path')
config.setAbsRootPath(path.resolve("."))

const http = require("http")
const express = require('express')
const locale = require("locale")
const compression = require('compression')
const request = require('request-promise')
const bodyParser  = require('body-parser')

/** TOOLS */
const log = require(config.getAbsRootPath()+'/src/server/shared/log.js')
const Const = require(config.getAbsRootPath()+'/src/server/shared/const.js')
const locales = require(config.getAbsRootPath()+'/src/server/shared/locales.js')
const api = require(config.getAbsRootPath()+'/src/server/front/tool/api.js')
const error = require(config.getAbsRootPath()+'/src/server/shared/error.js')
const authentication = require(config.getAbsRootPath()+'/src/server/front/authentication.js')

/** MODELS */
const model_user = require(config.getAbsRootPath()+'/src/server/front/model/user.js')

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
        res.sendFile(path.join(__dirname+'/../../../public/')+'/index.html')
    }
    catch (ex) { log.error('Send file index.html file failed !') }
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

/** AUTHENTICATION */
app.post(authentication.URL, authentication.ACTION)

/** USER */
app.post(model_user.urls.USERS, model_user[model_user.actions.LIST])
app.delete(model_user.urls.USER, model_user[model_user.actions.DELETE])

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