import VueRouter from 'vue-router';


import layout from '../views/layout/Layout.vue';

const routeArray = [];


/* 加载权限路由模块 */
import AccountRouterArray from "./modules/account";
import RoleRouterArray from "./modules/role";
import PermissionRouterArray from "./modules/permission";


export const asyncRoutes = routeArray.concat(AccountRouterArray,RoleRouterArray,PermissionRouterArray);



/**
 * 全局路由
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/',
        component: layout,
        redirect: '/dashboard/dashboard'
    },
    {
        path: '/dashboard',
        component: layout,
        children: [
            {
                path: 'dashboard',
                component: ()=> import('../views/dashboard/Index.vue'),
                hidden: true
            }
        ],
    },
    {
        path: '/login',
        component: () => import('../views/login2/Login.vue'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('../views/errorPage/404.vue'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('../views/errorPage/401.vue'),
        hidden: true
    },
    {
        path: '/layout',
        component: layout,
        children: asyncRoutes,
        hidden: true
    }
];

// /* 实例化Vuejs路由对象 */
const createRouter = () => new VueRouter({
    mode: 'history', // require service support
    routes: constantRoutes
});

const router = createRouter();

export default router
