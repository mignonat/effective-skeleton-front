import * as action_types from '../vuex/actions.js'

export default {
    getLocale () {
        return this.$store.getters.getLocale()
    },
    setLocale (locale) {
        this.$store
            .dispatch(action_types.SET_LOCALE, locale)
            .catch((ex) => {
                // TODO display error to user
                console.error('App.setLocale : '+ex)
            })
    }
}