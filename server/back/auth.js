const config = require('../shared/config.js')
const user_model = require(config.get('abs-root-path')+'/server/back/models/user.js')
const log = require(config.get('abs-root-path')+'/server/shared/log.js')
const jwt = require('jsonwebtoken')
const Const = require(config.get('abs-root-path')+'/server/shared/log.js')
const reader = require('properties-reader')
const properties = reader('/path/to/properties.file')
const secret = properties.get(Const.TOKEN_SECRET) //module scope

//TODO check properties not null

//TODO explore this api : https://www.npmjs.com/package/express-jwt

module.exports = {
    doAuth : (login, password, successFn, failedAuthFn, errorFn) => {
        user_model.findUserByLogin(login, 
        (user) => {
            if (!user) {
                log.debug('doAuth : no user found for login="'+login+'"')
                failedAuthFn()
            } else if (user) {
                if (user.password != password) {
                    log.debug('doAuth : bad password for login="'+login+'" and password="'+password+'"')
                    failedAuthFn()
                } else {
                    const newToken = jwt.sign(user, secret) // TODO don't put the password inside
                    // TODO : sign with RSA SHA256
                    //https://github.com/auth0/node-jsonwebtoken
                    //const cert = fs.readFileSync('private.key')  // get private key
                    //const token = jwt.sign({ foo: 'bar' }, cert, { algorithm: 'RS256'})
                    successFn(newToken)
                }
            }
        }, 
        (err) => {
            errorFn(err)
        })
    },
    validToken : (token, successFn, failedVerifingFn) => {
        if (token) {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    log.err('validToken : error => '+err)
                    failedVerifingFn()
                }
                successFn(decoded)
            })
        } else {
            log.debug('validToken : token empty')
            failedVerifingFn()
        }
    }
}