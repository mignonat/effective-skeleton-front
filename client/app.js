const HomeCmp = { template: '<div>Page accueil</div>' }
const CareCmp = { template: '<div>Page des soins</div>' }
const CleanCmp = { template: '<div>Page des nettoyages de lieux</div>' }
const WellbeingCmp = { template: '<div>Page du bien être</div>' }
const TestimonyCmp = { template: '<div>Page des témoignages</div>' }
const ContactCmp = { template: '<div>Page des contacts</div>' }

const router = new VueRouter({
  mode: 'history',
  base: '',
  routes: [
    { path: '/', component: HomeCmp },
    { path: '/care', component: CareCmp },
    { path: '/clean', component: CleanCmp },
    { path: '/wellbeing', component: WellbeingCmp },
    { path: '/testimony', component: TestimonyCmp },
    { path: '/contact', component: ContactCmp }
  ]
})

const store = new Vuex.Store({
  state: {
    locales : {
        'en': "English",
        'fr': "Français"
    },
    currentLocale : 'fr'
  },
  mutations: {
    setLocale (locale) {
        if (state.locales.indexOf(locale) > -1)
            state.currentLocale = locale ;
        else 
            console.log('Locale '+locale+' not supported !') ;
    }
  }
})

// Route components will be rendered inside <router-view>.
var app = new Vue({
    router : router,
    store : store,
    template: `
        <div id="app">
            <ul id="menu">
                <li><router-link to="/">Page d'accueil</router-link></li>
                <li><router-link to="/care">Soins energétiques</router-link></li>
                <li><router-link to="/clean">Nettoyage de lieux</router-link></li>
                <li><router-link to="/wellbeing">Séances bien-être</router-link></li>
                <li><router-link to="/testimony">Témoignages</router-link></li>
                <li><router-link to="/contact">Me contacter</router-link></li>
            </ul>
            <div id="content">
                <div id="content-header">
                    <span id="title">Mon objectif est d'aider et de guérir un maximum de personnes</span>
                </div>
                <router-view class="view"></router-view>
            </div>
        </div>
    `,
    methods : {
        setLocale : (locale) => {
            store.commit('setLocale', locale) ;
        }
    }
}) ;

app.$mount('#app')