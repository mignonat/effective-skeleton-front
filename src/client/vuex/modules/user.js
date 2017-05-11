import preference from '../../utils/preferences.js'
import * as action_types from '../actions.js'
import * as mutation_types from '../mutations.js'

/**************** STATE ****************/

const tokenLifeSpan = 1000*60*60*24 //milli seconds
const isTokenValid = (token, token_time) => {
    return token && tokenLifeSpan > (token_time-Date.now())
}
const token = isTokenValid(preference.get(preference.TOKEN))? preference.get(preference.TOKEN) : undefined
const token_time = (token)? preference.get(preference.TOKEN_TIME) : undefined
const user = (token)? preference.get(preference.USER) : undefined

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
        } else {
            state.token = undefined
            state.token_time = undefined
            state.user = undefined
            preference.remove(preference.TOKEN)
            preference.remove(preference.TOKEN_TIME)
            preference.remove(preference.USER)
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
    }
}

/**************** EXPORTED ****************/

const getters = {
    getToken : (state) => () => methods.getToken(state),
    getUser : (state) => () => methods.getUser(state),
    isTokenValid : (state) => () => methods.isTokenValid(state)
}

const actions = {

    [action_types.SET_TOKEN] ({ commit }, params) {
        return new Promise((resolve, reject) => {
            try {
                if (!params.user)
                    reject('users.actions.setToken : Invalid user')
                commit(mutation_types.SET_TOKEN, params.token, params.user)
                resolve()
            } catch (ex) {
                reject('users.actions.setToken : '+ex)
            }
        })
    },

    [action_types.INVALIDATE_TOKEN] ({ commit }) {
        return new Promise((resolve, reject) => {
            try {
                commit(mutation_types.SET_TOKEN, undefined)
                resolve()
            } catch (ex) {
                reject('users.actions.invalidateToken : '+ex)
            }
        })
    }

}

const mutations = {

    [mutation_types.SET_TOKEN] (state, token) {
        methods.setToken(state, token)
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}