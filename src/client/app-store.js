const app_store = new Vuex.Store({
    state: {
        locales : app_locales,
        currentLocale : app_locale,
        translationMap : app_locales[app_locale].translationMap
    },
    mutations: {
        setLocale (state, locale) {
            if (state.locales.hasOwnProperty(locale))
                if (state.currentLocale != locale) {
                    state.currentLocale = locale
                    state.translationMap = state.locales[locale].translationMap
                }
                else
                    console.log('Locale '+locale+' is already used !')
            else
                console.log('Locale '+locale+' not supported !')
        }
    }
})