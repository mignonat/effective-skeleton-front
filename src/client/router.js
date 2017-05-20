import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/contents/Home.vue'
import AdminUsers from './components/contents/admin/Users.vue'
import AdminGroups from './components/contents/admin/Groups.vue'
import Contact from './components/contents/Contact.vue'
import Sample from './components/contents/Sample.vue'
import ErrorUnknown from './components/contents/Error.vue'
import Error404 from './components/contents/Error404.vue'

Vue.use(VueRouter)

export default new VueRouter({
    mode    : 'history',
    base    : '',
    routes  : [
        { path: '/home', component: Home },
        { path: '/admin/users', component: AdminUsers },
        { path: '/admin/groups', component: AdminGroups },
        { path: '/contact', component: Contact },
        { path: '/sample', component: Sample },
        { path: '/error', component: ErrorUnknown },
        { path: '/error-404', component: Error404 }
    ]
})