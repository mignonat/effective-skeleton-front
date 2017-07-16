/**
 * User controller
 */
const request = require('request-promise')
const config = require('../tool/config.js')
const api = require('../tool/api.js')
const error = require('../tool/error.js')
const Const = require('../tool/const.js')

const URLS = {
    USER : '/user',
    USERS : '/users'
}

const ACTIONS = {
    LIST : 'user-list',
    GET : 'user-get',
    DELETE : 'user-delete',
    UPDATE : 'user-update'
}

module.exports = {
    urls : URLS,
    actions : ACTIONS,
    [ACTIONS.LIST] : (req, res) => {
        try {
            const token = req.body.token || req.query.token || req.headers['x-access-token']
            if (!token) {
                error.fn500(res, 'No token provided')
                return ;
            }

            const options = {
                method: 'GET',
                uri: api.getUrl(URLS.USERS),
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
                        error.fn500(res, result.error)
                })
                .catch((err) => {
                    error.fn500(res, err)
                })
        } catch(ex) {
            error.fn500(res, ex)
        }
    },
    [ACTIONS.DELETE] : (req, res) => {
        try {
            //todo
        } catch(ex) {
            error.fn500(res, ex)
        }
    }
}