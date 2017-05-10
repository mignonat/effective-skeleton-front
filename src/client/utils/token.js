import preference from './preferences.js'

const tokenLifeSpan = 1000*60*60*24 //milli seconds
const token = preference.get(preference.TOKEN)
const token_time = preference.get(preference.TOKEN_TIME)

export default {
    setToken : (newToken) => {
        token = newToken
        preference.set(preference.TOKEN, newToken)
        preference.set(preference.TOKEN_TIME, Date.now())
    },
    getToken : () => {
        if (token && tokenLifeSpan > (token_time-Date.now()))
            return token
    }
}