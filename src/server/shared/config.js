const Const = require('./const.js')
const reader = require('properties-reader')
const config = {}

module.exports = {
    get : (key) => {
        return config[key]
    },
    set : (key, object) => {
        config[key] = object
    },
    getInPropertiesFile : (key) => {
        const properties = reader(__dirname+'/../../../env.properties')
        if (properties)
            return properties.get(key)
        else
            console.error('config.getInPropertiesFile : file env.properties not found !')
    },
    setAbsRootPath : (absRootPath) => {
        config[Const.ABS_ROOT_PATH] = absRootPath
    },
    getAbsRootPath : () => {
        return config[Const.ABS_ROOT_PATH]
    }
}