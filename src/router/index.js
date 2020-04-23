import VueRouter from 'vue-router';

import Login from '../views/login/Login.vue';
import error401 from '../views/errorPage/401.vue';

/* 初始路由模块 */
let routeArray = [
    {
        path: '',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        hiden: true
    },
    {
        path: '/401',
        component: error401,
        hiden: true
    }
];


/* 加载路由模块 */
import AccountRouterArray from "./modules/account";

routeArray = routeArray.concat(AccountRouterArray);

/* 实例化Vuejs路由对象 */
const routers = new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes: routeArray
});

export default routers;
