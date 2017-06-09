import Vue from 'vue'
import router from './router'
import store from './vuex/store'
import App from './component/App.vue'
import css from './resource/css/index.css' // managed by webpack

// Route components will be rendered inside <router-view>
export default new Vue({
    store, // inject store to all children
    router,
    el : 'app',
    components: { App }
})