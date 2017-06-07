import preference from '../../utils/preferences.js'
import * as action_types from '../actions.js'
import * as mutation_types from '../mutations.js'
import event from '../../utils/event.js'

/**************** STATE ****************/

const tokenLifeSpan = 1000*60*60*24 //milli seconds
const isTokenValid = (token, token_time) => {
    return token && tokenLifeSpan > (token_time-Date.now())
}
var token = preference.get(preference.TOKEN)
var token_time = preference.get(preference.TOKEN_TIME)
if (!isTokenValid(token, token_time)) {
    token = undefined
    token_time = undefined
} 
    
const user = (!token)? undefined : preference.get(preference.USER)

const state = {
    user : user,
    token : token,
    token_time : token_time
}

/**************** UTIL METHODS ****************/

const methods = {
    setToken : (state, newToken, user) => {
        if (newToken) {
            state.token = newToken
            state.token_time = Date.now()
            state.user = user
            preference.set(preference.TOKEN, state.token)
            preference.set(preference.TOKEN_TIME, state.token_time)
            preference.set(preference.USER, state.user)
            event.emit(event.LOGIN)
        } else {
            state.token = undefined
            state.token_time = undefined
            state.user = undefined
            preference.remove(preference.TOKEN)
            preference.remove(preference.TOKEN_TIME)
            preference.remove(preference.USER)
            event.emit(event.LOGOUT)
        }
    },
    getToken : (state) => {
        return state.token
    },
    getUser : (state) => {
        return state.user
    },
    isTokenValid : (state) => {
        return isTokenValid(state.token, state.token_time)
    },
    isAdmin : (state) => {
        return (state.user && state.user.admin)
    }
}

/**************** EXPORTED ****************/

const getters = {
    getToken : (state) => () => methods.getToken(state),
    getUser : (state) => () => methods.getUser(state),
    isTokenValid : (state) => () => methods.isTokenValid(state),
    isAdmin : (state) => () => methods.isAdmin(state)
}

const actions = {

    [action_types.SET_TOKEN] ({ commit }, params) {
        return new Promise((resolve, reject) => {
            try {
                if (params.token && !params.user)
                    reject('users.actions.setToken : Invalid user')
                commit(mutation_types.SET_TOKEN, params)
                resolve()
            } catch (ex) {
                reject('users.actions.setToken : '+ex)
            }
        })
    },

    [action_types.INVALIDATE_TOKEN] ({ commit }) {
        return new Promise((resolve, reject) => {
            try {
                commit(mutation_types.SET_TOKEN, {})
                resolve()
            } catch (ex) {
                reject('users.actions.invalidateToken : '+ex)
            }
        })
    }

}

const mutations = {

    [mutation_types.SET_TOKEN] (state, params) {
        methods.setToken(state, params.token, params.user)
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}