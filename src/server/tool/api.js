/**
 * Tool to get the backend api url 
 */
const url = require("url")
const path = require('path')
const config = require('./config.js')
const Const = require('./const.js')

const back_url = config.get(Const.BACK_URL)
const back_path = config.get(Const.BACK_PATH) // => /api
const urls = {} //cache

module.exports = {
    getUrl : (urlName) => {
        if (!urls.hasOwnProperty(urlName))
            urls[urlName] = url.resolve(back_url, path.join(back_path, urlName))
        
        return urls[urlName]
    }
}