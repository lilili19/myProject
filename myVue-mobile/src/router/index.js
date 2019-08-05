import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login'
import home from '../views/home'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/login',
            component: login,
            name: 'login',
            hidden: true
        },
        {
            path: '/home',
            component: home,
            name: 'home'
        }
    ]
})
