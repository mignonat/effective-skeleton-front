const Const = require('./const.js')
const reader = require('properties-reader')

const config = {}

const exportFn = {
    get : (key) => {
        if (config.hasOwnProperty(key))
            return config[key]
        else {
            const value = exportFn.getInPropertiesFile(key)
            config[key] = value
            return value
        }
    },
    set : (key, object) => {
        config[key] = object
    },
    getInPropertiesFile : (key) => {
        try {
            const properties = reader(__dirname+'/../../../env.properties')
            if (properties)
                return properties.get(key)
        } catch (ex) {
            console.error("config.getInPropertiesFile : check env.properties file !")
        }
    },
    setAbsRootPath : (absRootPath) => {
        config[Const.ABS_ROOT_PATH] = absRootPath
    },
    getAbsRootPath : () => {
        return config[Const.ABS_ROOT_PATH]
    }
}

module.exports = exportFn