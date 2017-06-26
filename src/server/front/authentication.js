const config = require(__dirname+'/../shared/config.js')
const api = require(config.getAbsRootPath()+'/src/server/front/tool/api.js')
const error = require(config.getAbsRootPath()+'/src/server/shared/error.js')

module.exports = {
    URL : '/authenticate',
    ACTION : (req, res) => {
        try {
            const params = req.body
            if (!params || !params.login || !params.password) {
                error.fn401(res, 'incorrect params')
                return
            }
            options = {
                method: 'POST',
                uri: api.getUrl(Const.URL_AUTHENTICATE),
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
                        error.fn401(res, 'Authentication failed')
                    else
                        error.fn500(res, err)
                })
        } catch(ex) {
            error.fn500(res, ex)
        }
    }
}

