const express = require('express')
const bodyParser  = require('body-parser')
const path = require('path')
const absolutePath = path.resolve(".")

const log = require(absolutePath+'/server/shared/log.js')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken') // used to create, sign, and verify tokens
const config = require(absolutePath+'/server/back/config.js') // get our config file
const User = require(absolutePath+'/server/back/models/user.js') // get our mongoose model

const app = express()

mongoose.connect(config.db_url, config.db_credential) // connect to database
app.set('superSecret', config.secret) // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const apiRoutes = express.Router(); 

//TODO explore this api : https://www.npmjs.com/package/express-jwt

apiRoutes.post('/authenticate', function(req, res) {

    log.info(JSON.stringify(req.body))

    // find the user
    User.findOne({
        name: req.body.name
    }, function(err, user) {

        if (err) throw err

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' })
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password)
                res.json({ success: false, message: 'Authentication failed. Wrong password.' })
            else 
            {
                var token = jwt.sign(user, app.get('superSecret'))

                // TODO : sign with RSA SHA256
                //https://github.com/auth0/node-jsonwebtoken
                //var cert = fs.readFileSync('private.key')  // get private key
                //var token = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256'})

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                })
            }
        }
    })
})

// Restrict access
apiRoutes.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token']

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' })
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded
                next()
            }
        })
    } else {
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        })
    }
})

apiRoutes.get('/', function(req, res) {
    res.json({ message: 'User '+req.decoded._doc.name+' : Welcome to the app REST web services !' })
})

apiRoutes.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users)
    })
})

app.use('/api', apiRoutes)

/*app.get('/setup', function(req, res) {
    // create a sample user
    var nick = new User({ 
        name: 'Laurent Mignonat', 
        password: 'petasse@31',
        admin: true 
    })

    // save the sample user
    nick.save(function(err) {
        if (err) throw err

        log.info('User saved successfully')
        res.json({ success: true })
    })
})*/

const port = process.env.PORT || 8080
app.listen(port)
log.info('Back web services started on port ' + port)