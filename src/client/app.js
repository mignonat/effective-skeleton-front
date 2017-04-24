import Vue from 'vue'
import router from './router'
import store from './vuex/store'
import App from './components/App.vue'

// Route components will be rendered inside <router-view>
new Vue({
    store, // inject store to all children
    router,
    el : 'app',
    components: { App }
})