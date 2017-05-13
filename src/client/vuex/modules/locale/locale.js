import locale_fr from './translations/fr.js'
import locale_en from './translations/en.js'
import preference from '../../../utils/preferences.js'
import urlParam from '../../../utils/url-params.js'
import * as action_types from '../../actions.js'
import * as mutation_types from '../../mutations.js'
import event from '../../../utils/event.js'

/**************** STATE ****************/

const supported = [ 'fr', 'en' ]
const cleanLocale = (locale) => locale.replace(/-[a-zA-Z]{2}/g, '').toLowerCase() // "en-GB" will be transformed into "en""

var locale = urlParam.get('locale') || preference.get(preference.LOCALE) || navigator.language || supported[0]
locale = cleanLocale(locale)
if (supported.indexOf(locale) == -1)
    locale = supported[0]

preference.set(preference.LOCALE, locale)

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

const state = {
    locales : locales,
    currentLocale : locale,
    translationMap : locales[locale].translationMap
}

/**************** UTIL METHODS ****************/

const methods = {
    isSupported : (state, locale) => state.locales.hasOwnProperty(cleanLocale(locale)),
    getLocale : (state) => state.currentLocale,
    setLocale : (state, locale) => { 
        state.currentLocale = locale 
    },
    setTranslationMap : (state, locale) => { 
        state.translationMap = state.locales[locale].translationMap 
    }
}

/**************** EXPORTED ****************/

const getters = {
    getLocale : (state) => () => methods.getLocale(state),
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

const actions = {

    [action_types.SET_LOCALE] ({ commit }, locale) {
        return new Promise((resolve, reject) => {
            try {
                commit(mutation_types.SET_LOCALE, locale)
                preference.set(preference.LOCALE, locale)
                resolve()
            } catch (ex) {
                reject('locale.actions.setLocale : '+ex)
            }
        })
    }

}

const mutations = {

    [mutation_types.SET_LOCALE] (state, locale) {
        if (!locale)
            throw 'Locale not defined'
        if (!methods.isSupported(state, locale))
            throw 'Locale "'+locale+'" not supported'
        if (methods.getLocale(state) != locale) {
            methods.setLocale(state, locale)
            methods.setTranslationMap(state, locale)
            event.emit(event.LOCALE_CHANGE)
        }
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}