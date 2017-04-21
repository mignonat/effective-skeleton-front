import Vue from 'vue';
import VueRouter from 'vue-router';

const HomeCmp = { template: '<div>Page d\'accueil</div>' }
const CareCmp = { template: '<div>Page des soins</div>' }
const CleanCmp = { template: '<div>Page des nettoyages de lieux</div>' }
const WellbeingCmp = { template: '<div>Page du bien être</div>' }
const TestimonyCmp = { template: '<div>Page des témoignages</div>' }
const ContactCmp = { template: '<div>Page des contacts</div>' }
const ErrorCmp = { template: '<div>Page erreur</div>' }
const Error404Cmp = { template: '<div>Page erreur 404</div>' }

Vue.use(VueRouter);

export const router = new VueRouter({
    mode    : 'history',
    base    : '',
    routes  : [
        { path: '/home', component: HomeCmp },
        { path: '/care', component: CareCmp },
        { path: '/clean', component: CleanCmp },
        { path: '/wellbeing', component: WellbeingCmp },
        { path: '/testimony', component: TestimonyCmp },
        { path: '/contact', component: ContactCmp },
        { path: '/error', component: ErrorCmp },
        { path: '/error-404', component: Error404Cmp }
    ]
})