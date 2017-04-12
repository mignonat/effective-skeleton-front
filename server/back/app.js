const config = require(__dirname+'/../shared/config.js')
const path = require('path')
config.setAbsRootPath(path.resolve('.'))

const express = require('express')
const bodyParser  = require('body-parser')
const dbUtils = require(config.getAbsRootPath()+'/server/shared/db-utils.js')
const log = require(config.getAbsRootPath()+'/server/shared/log.js')
const auth = require(config.getAbsRootPath()+'/server/back/auth.js')
const Const = require(config.getAbsRootPath()+'/server/shared/const.js')
const user_model = require(config.getAbsRootPath()+'/server/back/models/user.js')

const app = express()

log.info('Starting on environment "'+config.getInPropertiesFile(Const.APP_ENV)+'"')

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const routes = express.Router(); 

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
    auth.doAuth(req.body.login, req.body.password, 
    (newToken) => { // auth successed
        res.json({
            success: true,
            token: newToken
        })
    },
    () => { // auth failed
        res.json({ 
            success: false, 
            message: 'Authentication failed'
        })
    }, 
    (err) => { // internal error
        log.error('/authenticate : '+err)
        res.json({ 
            success: false,
            message: 'Internal server error' 
        })
    })
})

// Before this routes doesn't need to be authenticated
routes.use((req, res, next) => {
    auth.validToken(
        req.body.token || req.query.token || req.headers['x-access-token'], // get request token
        (tokenInfos) => { // successfull validation
            req.decoded = tokenInfos
            next() // Data will be available in req.decoded._doc
        },
        () => { // failed validation
            return res.status(403).send({ 
                success: false, 
                message: 'Token validation failed' 
            })
        }
    )
})
// After this routes need to be authenticated

routes.get('/', (req, res) => {
    res.json({
        success : true,
        message: (req.decoded._doc.name)? ('User '+req.decoded._doc.name+' : ') : '' + 'REST API is running'
    })
})

routes.get('/users', user_model.getRouteFn('/users'))

app.use('/api', routes)

const port = config.getInPropertiesFile(Const.APP_PORT) || 8080
app.listen(port)
log.info('Back web services started on port ' + port)