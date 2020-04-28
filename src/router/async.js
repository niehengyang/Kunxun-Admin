/**
* 权限路由
* this page have permission requirements
*/
export const asyncRouter = [

  {
    path: '/nav/',
    name:'system.nav.index',
    component: () => import('../views/system/nav/Index.vue'),
  },

  {
    path: '/web/',
    name:'system.web.index',
    component: () => import('../views/system/web/Index.vue'),
  },

  {
    path: '/user/',
    name:'account.uer.index',
    component: () => import('../views/account/uer/Index.vue'),
  },

  {
    path: '/role/',
    name:'account.role.index',
    component: () => import('../views/account/role/Index.vue'),
  },

]
