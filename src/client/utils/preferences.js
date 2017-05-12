const isBrowserOK = () => {
    try {
        localStorage.setItem('test-browser-support', true);
        localStorage.removeItem('test-browser-support');
        return true;
    } catch (ex) {
        return false;
    }
}

const method = isBrowserOK()? {
    get : (key) => {
        try {
            const value = localStorage.getItem(key)
            return (!value)? undefined : JSON.parse(value)
        } catch (ex) {
            console.warn('preference.get : '+ex)
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
    },
    remove : (key) => {
        try {
            localStorage.removeItem(key)
        } catch (ex) {
            console.error('preference.remove key "'+key+'" failed : '+ex)
            return false
        }
        return true ;
    }
} : {
    get : (key) => {
        console.error('preference.get : browser does not support local storage !') ;
    },
    set : (key, value) => {
        console.error('preference.set : browser does not support local storage !') ;
    },
    remove : (key) => {
        console.error('preference.remove : browser does not support local storage !') ;
    }
}

const constants = {
    LOCALE : 'locale',
    TOKEN : 'token',
    TOKEN_TIME : 'token-time',
    USER : 'user'
}

export default Object.assign(method, constants)