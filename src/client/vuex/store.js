import Vue from 'vue'
import Vuex from 'vuex'
import locale from './modules/locale/locale.js'
import user from './modules/user.js'

Vue.use(Vuex);

const actions = {}
const getters = {}

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        locale,
        user
    }
})