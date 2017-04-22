import Vue from 'vue';
import Vuex from 'vuex';
import localeManager from './locales/locales.js'

Vue.use(Vuex);

const state = Object.assign({}, localeManager.getStoreInitialState())
const mutations = Object.assign({}, localeManager.getStoreMutations())
const getters = Object.assign({}, localeManager.getStoreGetters())

export default new Vuex.Store({
    state : state,
    mutations : mutations,
    getters : getters
})