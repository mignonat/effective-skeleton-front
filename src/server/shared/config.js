const Const = require('./const.js')
const reader = require('properties-reader')

const cache = {}

const exportFn = {
    get : (key) => {
        if (cache.hasOwnProperty(key))
            return cache[key]
        else {
            const value = exportFn.getInPropertiesFile(key)
            cache[key] = value
            return value
        }
    },
    set : (key, object) => {
        cache[key] = object
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
        cache[Const.ABS_ROOT_PATH] = absRootPath
    },
    getAbsRootPath : () => {
        return cache[Const.ABS_ROOT_PATH]
    },
    resetCache : () => {
        cache = {}
    }
}

module.exports = exportFn