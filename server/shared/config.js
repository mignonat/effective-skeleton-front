const Const = require('./const.js')
const config = {}

module.exports = {
    get : (key) => {
        return config[key]
    },
    set : (key, object) => {
        config[key] = object
    },
    setAbsRootPath : (absRootPath) => {
        config[Const.ABS_ROOT_PATH] = absRootPath
    },
    getAbsRootPath : () => {
        return config[Const.ABS_ROOT_PATH]
    }
}