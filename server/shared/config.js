const config = {}

module.exports = {
    get : (key) => {
        return config[key]
    },
    set : (key, object) => {
        config[key] = object
    }   
}