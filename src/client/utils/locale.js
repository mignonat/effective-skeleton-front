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
                console.error('locale.setLocale : error, '+ex)
                bus.emit(bus.POPUP_ERROR, [ this.translate('all.error'), this.translate('all.error.locale.set') ]);
            })
    },
    translate (key, params) {
        return this.$store.getters.translate(key, params)
    }
}