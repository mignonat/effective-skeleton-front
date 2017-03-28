const HomeCmp = { template: '<div>Page accueil</div>' }
const CareCmp = { template: '<div>Page des soins</div>' }
const CleanCmp = { template: '<div>Page des nettoyages de lieux</div>' }
const WellbeingCmp = { template: '<div>Page du bien être</div>' }
const TestimonyCmp = { template: '<div>Page des témoignages</div>' }
const ContactCmp = { template: '<div>Page des contacts</div>' }

const router = new VueRouter({
    mode    : 'history',
    base    : '',
    routes  : [
        { path: '/home', component: HomeCmp },
        { path: '/care', component: CareCmp },
        { path: '/clean', component: CleanCmp },
        { path: '/wellbeing', component: WellbeingCmp },
        { path: '/testimony', component: TestimonyCmp },
        { path: '/contact', component: ContactCmp }
    ]
})

var appLocale = 'fr'
const appLocales = {
    'en': {
        'name' : 'English',
        'translationMap' : {
            'main-title' : 'My purpose is to help and heal the maximum of people I can do',
            'menu-home' : 'Home page',
            'menu-care' : 'Health care',
            'menu-clean' : 'Cleaning of places',
            'menu-wellbeing' : 'Wellness sessions',
            'menu-testimony' : 'Testimonials',
            'menu-contact' : 'Contact me'
        }
    },
    'fr': {
        'name' : 'Français',
        'translationMap' : {
            'main-title' : 'Mon objectif est d\'aider et de guérir un maximum de personnes',
            'menu-home' : 'Page d\'accueil',
            'menu-care' : 'Soins energétiques',
            'menu-clean' : 'Nettoyage de lieux',
            'menu-wellbeing' : 'Séances bien-être',
            'menu-testimony' : 'Témoignages',
            'menu-contact' : 'Me contacter'
        }
    }
};

(function checkParams() {
    var searchParams = location.search //?locale=fr&otherParam=paramValue
    if (searchParams) {
        searchParams = searchParams.substring(1, searchParams.length)
        const params = searchParams.split('&')
        var i=0, len=params.length
        var param, key, value
        for (;i<len;i++) {
            param = params[i].split('=')
            key = param[0]
            if (key != 'locale')
                continue
            value = param[1]
            if (appLocales.hasOwnProperty(value)) {
                appLocale = value; break ;
            }
        }
    }
})()

const store = new Vuex.Store({
    state: {
        locales : appLocales,
        currentLocale : appLocale,
        translationMap : appLocales[appLocale].translationMap
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

// Route components will be rendered inside <router-view>.
const app = new Vue({
    router   : router,
    store    : store,
    template : `
        <div id="app">
            <div id="header">
                <span id="mc-name">
                    Marie-Charlotte
                </span>
                <span id="title">
                    {{ translate("main-title") }}
                </span>
                <select id="select-locale" name="selectedLocale" @change="setLocale">
                    <option value="fr" :selected="getLocale() === 'fr'">
                        Français
                    </option>
                    <option value="en" :selected="getLocale() === 'en'">
                        English
                    </option>
                </select>
            </div>
            <ul id="menu">
                <li><router-link to="/home" active-class="active">     {{ translate("menu-home") }}     </router-link></li>
                <li><router-link to="/care" active-class="active">     {{ translate("menu-care") }}     </router-link></li>
                <li><router-link to="/clean" active-class="active">    {{ translate("menu-clean") }}    </router-link></li>
                <li><router-link to="/wellbeing" active-class="active">{{ translate("menu-wellbeing") }}</router-link></li>
                <li><router-link to="/testimony" active-class="active">{{ translate("menu-testimony") }}</router-link></li>
                <li><router-link to="/contact" active-class="active">  {{ translate("menu-contact") }}  </router-link></li>
            </ul>
            <router-view class="content"></router-view>
        </div>
    `,
    methods : {
        setLocale (locale) {
            if (locale instanceof Object) 
                locale = event.target.value

            store.commit('setLocale', locale)
        },
        getLocale () {
            return store.state.currentLocale
        },
        translate (key, params) {
            
            var translation = store.state.translationMap[key]

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
}) ;

app.$mount('#app')
