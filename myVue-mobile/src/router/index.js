import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login'
import home from '../views/home'
import message from '../views/home/message'
import userList from '../views/home/userList'
import my from '../views/home/my'
import chat from '../views/home/chat'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: 'mobile',
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
            name: 'home',
            children: [
                {
                    path: 'message',
                    component: message,
                    name: 'message'
                },
                {
                    path: 'userList',
                    component: userList,
                    name: 'userList'
                },
                {
                    path: 'my',
                    component: my,
                    name: 'my'
                }
            ],
            redirect: '/home/message'
        },
        {
            path: 'chat',
            component: chat,
            name: 'chat'
        }
    ]
})
