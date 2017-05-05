import Vue from 'vue'

const bus = new Vue({})

export default {
    emit (eventName, args) {
        bus.$emit(eventName, args);
    },
    listen (eventName, fn) {
        bus.$on(eventName, fn)
    },
    POPUP_ERROR : 'popupError'
}