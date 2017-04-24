import Vue from 'vue';
import Vuex from 'vuex';
import locale from './modules/locale/locale.js'

Vue.use(Vuex);

const actions = {}
const getters = {}

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        locale
    }
})