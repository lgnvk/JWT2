import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../components/Home.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../components/Register.vue')
    },
    {
        path: '/auth',
        name: 'auth',
        component: () => import('../components/Auth.vue')
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})