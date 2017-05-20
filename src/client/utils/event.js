const handlersByEventName = {}

const events = {
    POPUP_ERROR : 'POPUP_ERROR',
    LOCALE_CHANGE : 'LOCALE_CHANGE',
    LOGIN : 'LOGIN',
    LOGOUT : 'LOGOUT',
    MENU_OPENED : 'MENU_OPENED',
    MENU_CLOSED : 'MENU_CLOSED'
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