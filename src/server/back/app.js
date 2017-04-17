const config = require(__dirname+'/../shared/config.js')
const path = require('path')
config.setAbsRootPath(path.resolve('.'))

const express = require('express')
const bodyParser  = require('body-parser')
const dbUtils = require(config.getAbsRootPath()+'/src/server/shared/db-utils.js')
const log = require(config.getAbsRootPath()+'/src/server/shared/log.js')
const auth = require(config.getAbsRootPath()+'/src/server/back/auth.js')
const Const = require(config.getAbsRootPath()+'/src/server/shared/const.js')
const user_model = require(config.getAbsRootPath()+'/src/server/back/models/user.js')

const app = express()

log.info('Starting on environment "'+config.get(Const.APP_ENV)+'"')

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const routes = express.Router(); 

const err500Fn = (req, err) => {
    log.error('app.processSafeRoute : '+err)
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    })
}

const processSafeRoute = (req, res, routeFn) => {
    try {
        if (routeFn) routeFn(req, res)
        else err500Fn(req, 'app.processSafeRoute : routeFn not defined')
    } catch (ex) { errFn(req, ex) }
}

/*routes.get('/setup', function(req, res) {
    // create a sample user
    const User = user_model.getUserSchema()
    const me = new User({ 
        login: 'mignonat',
        firstname: 'Laurent',
        lastname: 'Mignonat',
        password: 'petasse@31',
        admin: true 
    })

    // save the sample user
    me.save(function(err) {
        if (err) throw err

        log.info('User saved successfully')
        res.json({ success: true })
    })
})*/

routes.post('/authenticate', (req, res) => {
    try {
        auth.doAuth(req.body.login, req.body.password)
            .then((newToken) => { // auth successed
                res.json({
                    success: true,
                    token: newToken
                })
            })
            .catch((isFailedAuth) => { // auth failed
                if (!isFailedAuth) res.status(500)
                res.json({
                    success: false,
                    message: isFailedAuth? 'Authentication failed' : 'Internal server error'
                })
            })
    } catch (ex) { err500Fn(req, 'authenticate'+ex) }
})

// Before this routes doesn't need to be authenticated
routes.use((req, res, next) => {
    try {
        auth.validToken(req.body.token || req.query.token || req.headers['x-access-token']) // get request token
            .then((tokenInfos) => { // successfull validation
                req.decoded = tokenInfos
                next() // Data will be available in req.decoded._doc
            })
            .catch((isInvalidToken) => { // failed validation
                if (isInvalidToken) res.status(403)
                else res.status(500)

                return res.send({
                    success: false,
                    message: isInvalidToken? 'Token validation failed' : 'Internal server error'
                })
            }
        )
    } catch (ex) { err500Fn(req, 'app.use : '+ex) }
})
// After this routes need to be authenticated

routes.get('/', (req, res) => {
    try {
        res.json({
            success : true,
            message: "REST API on version "+config.get(Const.APP_API_VERSION)+" is running" + ((req.decoded._doc)? (" | request user '"+req.decoded._doc.login+"'") : "")
        })
    } catch (ex) { err500Fn(req, '/ : '+ex) }
})

routes.get('/users', (req, res) => {
    processSafeRoute(req, res, user_model.getRouteFn('/users'))
})

app.use('/api', routes)

const port = config.get(Const.APP_PORT) || 5151
app.listen(port)
log.info('Back web services started on port ' + port)