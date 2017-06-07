// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = mongoose.model('User', new Schema({
    firstname: String,
    lastname: String,
    login: String,
    password: String, 
    admin: Boolean
}))

const service = {
    getRouteFn : (route) => {
        return routesFn[route]
    },
    getUserSchema : () => {
        return User ;
    },
    findUserByLogin : (name) => {
        return new Promise(function(resolve, reject) {
            User.findOne({ login : name }, (err, user) => {
                if (err) reject(err)
                else resolve(user)
            })
        })
    },
    findAll : () => {
        return new Promise(function(resolve, reject) {
            User.find({}, (err, user) => {
                if (err) reject(err)
                else resolve(user)
            })
        })
    }
}

const routesFn = {
    '/users' : (req, res) => {
        service.findAll()
            .then((users) => {
                res.json({
                    success : true,
                    users : users
                })
            })
            .catch((err) => {
                log.error('/users : '+err)
                res.status(500).json({
                    success : false,
                    message : 'Internal server error'
                })
            })
    }
}

module.exports = service