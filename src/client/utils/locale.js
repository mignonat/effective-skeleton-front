import * as action_types from '../vuex/actions.js'
import bus from './bus.js'

export default {
    getLocale () {
        return this.$store.getters.getLocale()
    },
    setLocale (locale) {
        this.$store
            .dispatch(action_types.SET_LOCALE, locale)
            .catch((ex) => {
                bus.$emit('popupError', 'Error', 'Error content !!!');
                console.error('App.setLocale : '+ex)
            })
    }
}