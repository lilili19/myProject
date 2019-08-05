import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login'
import home from '../views/home'
import Detail from '../views/home/detail'
import ProjectList from '../views/home/projectList'
import SetUser from '../views/home/setUser'

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
            name: 'home',
            children: [
                {
                    path: 'setUser',
                    component: SetUser,
                    name: 'setUser'
                },
                {
                    path: 'projectList/:id',
                    component: ProjectList,
                    name: 'projectList'
                },
                {
                    path: 'detail',
                    component: Detail,
                    name: 'detail'
                },
                {
                    path: 'detail/:id',
                    component: Detail,
                    name: 'detailId'
                }
            ]
        }
    ]
})
