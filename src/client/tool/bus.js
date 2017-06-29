const handlersByEventName = {} // Will contain all function handler by event name

// We authorized only pre-defined events
const events = {
    POPUP : 'POPUP',
    LOCALE_CHANGE : 'LOCALE_CHANGE',
    LOGIN : 'LOGIN',
    LOGOUT : 'LOGOUT',
    SIDENAV_OPENED : 'SIDENAV_OPENED',
    SIDENAV_CLOSED : 'SIDENAV_CLOSED',
    SIDENAV_CHANGE : 'SIDENAV_CHANGE'
}

const checkName = (eventName) => {
    if (events.hasOwnProperty(eventName))
        return true
    
    console.warn('event.checkname : unknown eventName '+eventName)
    return false
}

const addEvent = (eventName, handlerId, handler) => {
    var handlers = handlersByEventName[eventName]
    if (!handlers) {
        handlers = {}
        handlersByEventName[eventName] = handlers
    }
    handlers[handlerId] = handler
}

const removeEvent = (eventName, handlerId) => {
    var handlers = handlersByEventName[eventName]
    if (handlers) {
        delete handlers[handlerId]
    }
}

const processEvent = (eventName, args) => {
    const handlers = handlersByEventName[eventName]
    if (handlers) {
        for (var handlerId in handlers) {
            if (handlers.hasOwnProperty(handlerId)) {
                try {
                    handlers[handlerId](args)
                } catch (ex) {
                    console.error('Error : event="'+eventName+'", handlerId="'+handlerId+'" : '+ex)
                }
            }
        }
    }
}

const methods = {
    fire (eventName, args) {
        if (!checkName(eventName)) return
        
        processEvent(eventName, args)
    },
    listen (eventName, handlerId, handler) {
        if (!checkName(eventName)) return

        addEvent(eventName, handlerId, handler)
    },
    remove (eventName, handlerId) {
        if (!checkName(eventName)) return

        removeEvent(eventName, handlerId)
    }
}

export default Object.assign(methods, events)