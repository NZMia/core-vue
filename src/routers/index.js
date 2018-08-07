import Router from 'vue-router'
import Vue from 'Vue'

import Home from '../pages/home.vue';
// const Home = () => import('../page/home.vue')

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/index',
            name: 'home',
            component: Home
        }
    ]
})
