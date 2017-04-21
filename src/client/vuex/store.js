import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const locale = 'fr'
const locales = {
    'fr': {
        'name' : 'Français',
        'translationMap' : {
            "main.title": "Mon objectif est d'aider et de guérir un maximum de personnes",
            "menu.home": "Page d'accueil",
            "menu.care": "Soins energétiques",
            "menu.clean": "Nettoyage de lieux",
            "menu.wellbeing": "Séances bien-être",
            "menu.testimony": "Témoignages",
            "menu.contact": "Me contacter"
        }
    },
    'en': {
        'name' : 'English',
        'translationMap' : {
            "main.title": "My purpose is to help and heal the maximum of people I can do",
            "menu.home": "Home page",
            "menu.care": "Health care",
            "menu.clean": "Cleaning of places",
            "menu.wellbeing": "Wellness sessions",
            "menu.testimony": "Testimonials",
            "menu.contact": "Contact me"
        }
    }
}

const state = {
    locales : 'fr',
    currentLocale : locale,
    translationMap : locales[locale].translationMap
}

const mutations = {
    SET_LOCALE (state, locale) {
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

export default new Vuex.Store({
    state,
    mutations
})