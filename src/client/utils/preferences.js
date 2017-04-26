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
} : {
    get : (key) => {
        console.error('preference.get : browser does not support local storage !') ;
    },
    set : (key, value) => {
        console.error('preference.set : browser does not support local storage !') ;
    }
}

const constants = {
    LOCALE : 'locale'
}

export default Object.assign(method, constants)