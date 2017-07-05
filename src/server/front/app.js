const config = require(__dirname+'/../shared/config.js')
const path = require('path')
config.setAbsRootPath(path.resolve("."))

const url = require("url")
const http = require("http")
const express = require('express')
const locale = require("locale")
const compression = require('compression')
const request = require('request-promise')
const bodyParser  = require('body-parser')

const log = require(config.getAbsRootPath()+'/src/server/shared/log.js')
const Const = require(config.getAbsRootPath()+'/src/server/shared/const.js')
const locales = require(config.getAbsRootPath()+'/src/server/shared/locales.js')

const app = express()
app.use(locale(locales.getSupportedLocales()))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

log.info('Creating api url')
const apiUrl = ((urlName) => {
    const back_url = config.get(Const.BACK_URL)
    const back_path = config.get(Const.BACK_PATH) // => /api
    const urls = {} //cache
    
    return {
         get : (urlName) => {
            if (!urls.hasOwnProperty(urlName))
                urls[urlName] = url.resolve(back_url, path.join(back_path, urlName))
            
            return urls[urlName]
        }
    }
})()

log.info('Starting on environment "'+config.get(Const.APP_ENV)+'"')

// Give access to assets directories
app.use(express.static('public', {
    index: false // to ignore serving static file index.html
}))

// Compress data to reduce network package size
app.use(compression())

const publicDir = path.join(__dirname+'/../../../public/')

const err401Fn = (res, err) => {
    log.error('app.err401Fn : '+err)
    res.status(401).json({
        success: false,
        message: 'Unauthorized : provide authentication token'
    })
}

const err403Fn = (res, err) => {
    log.error('app.err403Fn : '+err)
    res.status(403).json({
        success: false,
        message: 'Forbidden : you are not allowed to access the resource'
    })
}

const err500Fn = (res, err) => {
    log.error('app.err500Fn : '+err)
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    })
}

const homePageFn = (req, res) => {
    try {
        log.debug('New request on url = "'+req.url+'"')
        res.sendFile(publicDir+'/index.html')
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
app.get('/error-500', homePageFn)

app.post(Const.URL_AUTHENTICATE, (req, res) => {
    try {
        const params = req.body
        if (!params || !params.login || !params.password) {
            err401Fn(res, 'incorrect params')
            return
        }
        options = {
            method: 'POST',
            uri: apiUrl.get(Const.URL_AUTHENTICATE),
            form: {
                login: params.login,
                password: params.password
            },
            headers: { 
                'User-Agent': 'Request-Promise', 
            },
            json: true  
        }
        request(options)
            .then((data) => {
                res.json({
                    success : true,
                    token : data.token,
                    user : data.user
                })
            })
            .catch((err) => {
                if (err.statusCode == 401)
                    err401Fn(res, 'Authentication failed')
                else
                    err500Fn(res, err)
            })
    } catch(ex) {
        err500Fn(res, ex)
    }
})

app.post(Const.URL_USERS, (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token']
        if (!token) {
            err500Fn(res, 'No token provided')
            return ;
        }

        const options = {
            method: 'GET',
            uri: apiUrl.get(Const.URL_USERS),
            headers: { 
                'User-Agent': 'Request-Promise',
                'x-access-token': token
            },
            json: true
        }
        request(options)
            .then((result) => {
                if (result.success) {
                    res.json({
                        success : true,
                        users : result.users
                    })
                } else
                    err500Fn(res, result.error)
            })
            .catch((err) => {
                err500Fn(res, err)
            })
    } catch(ex) {
        err500Fn(res, ex)
    }
})

app.delete(Const.URL_USER, (req, res) => {
    try {
        //todo
    } catch(ex) {
        err500Fn(res, ex)
    }
})

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
