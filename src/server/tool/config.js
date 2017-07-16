/**
 * App config param tool
 * For a given param, search in this tool cache before searching in env.properties files
 * We can also add other params as it's done for ABS_ROOT_PATH
 */
const Const = require('./const.js')
const reader = require('properties-reader')

const cache = {}

const env_type = process.env.NODE_ENV=='production'? 'prod' : 'dev'
const env_file_path = __dirname+'/../../../env/'+env_type+'.properties'

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
            const properties = reader(env_file_path)
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