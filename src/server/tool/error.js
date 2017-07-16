/**
 * Handle json errors message
 */
const config = require('./config.js')
const log = require('./log.js')

module.exports = {
    fn401 : (res, err) => {
        log.error(err)
        res.status(401).json({
            success: false,
            message: 'Unauthorized : provide authentication token'
        })
    },
    fn403 : (res, err) => {
        log.error(err)
        res.status(403).json({
            success: false,
            message: 'Forbidden : you are not allowed to access the resource'
        })
    },
    fn500 : (res, err) => {
        log.error(err)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    },

}