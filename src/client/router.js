import Vue from 'vue';
import VueRouter from 'vue-router';

import bus from './tool/bus.js'

import Home from './component/page/Home.vue'
import AdminUsers from './component/page/admin/Users.vue'
import AdminGroups from './component/page/admin/Groups.vue'
import AdminBatch from './component/page/admin/Batch.vue'
import AdminMaintenance from './component/page/admin/Maintenance.vue'
import AdminLogs from './component/page/admin/Logs.vue'
import Contact from './component/page/Contact.vue'
import SampleComponent from './component/page/SampleComponent.vue'
import SampleContextualPanel from './component/page/SampleContextualPanel.vue'
import SampleForm from './component/page/SampleForm.vue'
import ErrorUnknown from './component/page/Error.vue'
import Error404 from './component/page/Error404.vue'
import Error500 from './component/page/Error500.vue'

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
            name : 'admin-batch',
            path: '/admin/batch', 
            component: AdminBatch 
        },{
            name : 'admdddin-maintenance',
            path: '/admin/maintenance', 
            component: AdminMaintenance 
        },{
            name : 'admin-logs',
            path: '/admin/logs', 
            component: AdminLogs 
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
            name : 'sample-form',
            path: '/sample-form', 
            component: SampleForm 
        },{
            name : 'error',
            path: '/error', 
            component: ErrorUnknown 
        },{
            name : 'error-404',
            path: '/error-404', 
            component: Error404 
        },{
            name : 'error-500',
            path: '/error-500', 
            component: Error500 
        }
    ]
})

// redirect on home page when user logout and was on an admin page
bus.listen(bus.LOGOUT, function Router() {
    if (router.currentRoute.path && router.currentRoute.path.startsWith('/admin/'))
        router.push(homeRoute)
})

export default router