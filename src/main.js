import Vue from 'vue';
import App from './App.vue'
import VueRouter from 'vue-router';
import router from './routers/index';
import 'main.scss'

Vue.use(VueRouter)

new Vue({
    el: '#app',
    render: h => h(App),
    router: router
})
