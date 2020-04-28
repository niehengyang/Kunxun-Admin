
/**
 * 权限路由
 * this page have permission requirements
 */
export const asyncRouters = [
    {
        path: '/account/list/',
        name: 'accountList',
        component: ()=> import('../views/account/Index.vue'),
    },
    {
        path: '/permission/list/',
        name: 'permissionList',
        component: ()=> import('../views/permission/Index.vue'),
    },
    {
        path: '/role/list/',
        name: 'roleList',
        component: ()=> import('../views/role/Index.vue'),
    },
    {
        path: '/system',
        name: 'system',
        component: ()=> import('../views/account/Index.vue'),
    }
];
