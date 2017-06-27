/**
 * User controller
 */
const config = require(__dirname+'/../../shared/config.js')
const api = require(config.getAbsRootPath()+'/src/server/front/tool/api.js')
const error = require(config.getAbsRootPath()+'/src/server/shared/error.js')
const Const = require(config.getAbsRootPath()+'/src/server/shared/const.js')

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