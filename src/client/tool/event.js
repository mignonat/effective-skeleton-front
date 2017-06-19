const handlersByEventName = {}

const events = {
    POPUP : 'POPUP',
    LOCALE_CHANGE : 'LOCALE_CHANGE',
    LOGIN : 'LOGIN',
    LOGOUT : 'LOGOUT',
    SIDENAV_OPENED : 'SIDENAV_OPENED',
    SIDENAV_CLOSED : 'SIDENAV_CLOSED',
    SIDENAV_CHANGE : 'SIDENAV_CHANGE'
}

const methods = {
    isEventNameOk (eventName) {
        const isOk = events.hasOwnProperty(eventName)
        if (!isOk)
            console.warn('signal.emit : unknown signal '+eventName)
        
        return isOk
    },
    emit (eventName, args) {
        if (!this.isEventNameOk(eventName))
            return
        
        var handlers = handlersByEventName[eventName]
        if (handlers) {
            handlers.forEach(function(handler) {
                handler(args)
            });
        }
    },
    on (eventName, handler) {
        if (!this.isEventNameOk(eventName))
            return

        var handlers = handlersByEventName[eventName]
        if (!handlers) {
            handlers = []
            handlersByEventName[eventName] = handlers
        }
        handlers.push(handler)
    }
}

export default Object.assign(methods, events)