import Router from "vue-router";

import layout from '../views/layout/Layout.vue';


/**
 * 全局路由
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/',
        component: layout,
        redirect: 'dashboard',
        children: [
            {
                path: 'dashboard',
                component: ()=> import('../views/dashboard/Index.vue'),
            }
        ],
    },
    {
        path: '/login',
        component: () => import('../views/login/Login.vue'),
    },
    {
        path: '/404',
        component: () => import('../views/errorPage/404.vue'),
    },
    {
        path: '/401',
        component: () => import('../views/errorPage/401.vue'),
    }
];

export default new Router({
    mode: 'history', //后端支持可开
    routes: constantRoutes
})
