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
    getRoute : (route) => {
        return routesFn[route]
    },
    getUserSchema : () => {
        return User ;
    },
    findUserByLogin : (name, successFn, errorFn) => {
        User.findOne({
            login: name
        }, 
        (err, user) => {
            if (err)
                errorFn(err)
            else
                successFn(user)
        })
    },
    findAll : (successFn, errorFn) => {
        User.find({}, 
        (err, user) => {
            if (err) 
                errorFn(err)
            else
                successFn(user)
        })
    }
}

const routesFn = {
    '/users' : (req, res) => {
        service.findAll(
            (users) => {
                res.json({
                    success : true,
                    users : users
                })
            },
            (err) => {
                log.error('/users : '+err)
                res.json({
                    success : false,
                    message : 'Internal server error'
                })
            }
        )
    } 
}

module.exports = service