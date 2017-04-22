import locale_fr from './translations/fr.js'
import locale_en from './translations/en.js'
import urlParam from '../../utils/url-params.js'

const supported = [ 'fr', 'en' ]
var locale = urlParam.get('locale') || supported[0]
if (supported.indexOf(locale) == -1)
    locale = supported[0]

const locales = {
    'fr': {
        'name' : 'Français',
        'translationMap' : locale_fr
    },
    'en': {
        'name' : 'English',
        'translationMap' : locale_en
    }
}

const initialState = {
    locales : locales,
    currentLocale : locale,
    translationMap : locales[locale].translationMap
}

const storeMutations = {
    LOCALE_SET (state, locale) {
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

const storeGetters = {
    translate : (state, getters) => (key, params) => {
        var translation = state.translationMap[key]

        if (!translation)
            translation = '??-'+key+'-??'

        if (!params)
            return translation

        if (params instanceof Array) {
            const matches = translation.match(/{(\d+)}/g)

            if (!matches || matches.length != params.length)
                return translation+'-??-miss-param-??'

            var i= 0, txtPattern, regex
            for ( ; i<params.length; i++) {
                txtPattern = '{['+i+']}'
                regex = new RegExp(txtPattern)
                translation = translation.replace(regex, params[i])
            }
            return translation
        }
        else
            return translation.replace('{0}', params)
    }
}

export default {
    getStoreInitialState : () => initialState,
    getStoreMutations : () => storeMutations,
    getStoreGetters : () => storeGetters
}