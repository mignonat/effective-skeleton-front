const method = {
    get : (key) => {
        try {
            const value = localStorage.getItem(key)
            return (!value)? undefined : JSON.parse(value)
        } catch (ex) {
            console.error('preference.get : '+ex)
        }
    },
    set : (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (ex) {
            console.error('preference.set : '+ex)
            return false
        }
        return true ;
    }
}

const constants = {
    LOCALE : 'locale'
}

export default Object.assign(method, constants)