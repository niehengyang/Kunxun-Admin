import VueRouter from 'vue-router';

/**
 * 全局路由
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: () => import('../views/login/Login.vue'),
        hidden: true
    },
    // {
    //     path: '/404',
    //     component: () => import('@/views/error-page/404'),
    //     hidden: true
    // },
    {
        path: '/401',
        component: () => import('../views/errorPage/401.vue'),
        hidden: true
    },
];





const routeArray = [

];

/* 加载权限路由模块 */
import AccountRouterArray from "./modules/account";


export const asyncRoutes = routeArray.concat(AccountRouterArray);


// /* 实例化Vuejs路由对象 */
const createRouter = () => new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher // reset router
}

export default router
