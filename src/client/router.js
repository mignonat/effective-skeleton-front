import Vue from 'vue';
import VueRouter from 'vue-router';

import event from './tool/event.js'

import Home from './component/content/Home.vue'
import AdminUsers from './component/content/admin/Users.vue'
import AdminGroups from './component/content/admin/Groups.vue'
import Contact from './component/content/Contact.vue'
import SampleComponent from './component/content/SampleComponent.vue'
import SampleContextualPanel from './component/content/SampleContextualPanel.vue'
import ErrorUnknown from './component/content/Error.vue'
import Error404 from './component/content/Error404.vue'

Vue.use(VueRouter)

const homeRoute = { 
    name : 'home',
    path: '/home', 
    component: Home 
}

const router = new VueRouter({
    mode    : 'history',
    base    : '',
    routes  : [
        homeRoute,
        { 
            name : 'admin-users',
            path: '/admin/users', 
            component: AdminUsers
        },{
            name : 'admin-groups',
            path: '/admin/groups', 
            component: AdminGroups 
        },{
            name : 'contact',
            path: '/contact', 
            component: Contact 
        },{
            name : 'sample-component',
            path: '/sample-component', 
            component: SampleComponent 
        },{
            name : 'sample-contextual-panel',
            path: '/sample-contextual-panel', 
            component: SampleContextualPanel 
        },{
            name : 'error',
            path: '/error', 
            component: ErrorUnknown 
        },{
            name : 'error-404',
            path: '/error-404', 
            component: Error404 
        }
    ]
})

// redirect on home page when user logout and was on an admin page
event.on(event.LOGOUT, () => {
    if (router.currentRoute.path && router.currentRoute.path.startsWith('/admin/'))
        router.push(homeRoute)
})

export default router