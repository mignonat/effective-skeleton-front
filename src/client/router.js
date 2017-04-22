import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/Home.vue'
import Contact from './components/Contact.vue'
import ErrorUnknown from './components/Error.vue'
import Error404 from './components/Error404.vue'

Vue.use(VueRouter)

export default new VueRouter({
    mode    : 'history',
    base    : '',
    routes  : [
        { path: '/home', component: Home },
        { path: '/contact', component: Contact },
        { path: '/error', component: ErrorUnknown },
        { path: '/error-404', component: Error404 }
    ]
})