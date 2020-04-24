import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import router from '../router/index';
import store from '../store/index';

import {Message} from 'element-ui';
import ElementUi from 'element-ui';
Vue.use(Vuex,VueRouter,ElementUi,router,store,Message);


import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import TokenFactory from './tokenfactory' // get token from cookie


NProgress.configure({ showSpinner: false }); // NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) return true; // admin permission passed directly
    if (!permissionRoles) return true;
    return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login','/401','/404','/role/list/']; // 不重定向白名单

router.beforeEach((to, from, next) => {
    NProgress.start();
    if (TokenFactory.getToken()) {

        /* has token*/
        if (to.path === '/login') {
            next({ path: '/' });
            NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
        } else {
            console.log('____________初次登录_____________');

            if (store.getters.roles.length === 0) {
                store.dispatch('GetInfo').then(res => { // 拉取用户信息

                    // const roles = res.roles; // note: roles must be a array! such as: ['editor','develop']

                    // store.dispatch('generateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
                    //     router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
                    //     next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                    // })

                }).catch((err) => {

                    store.dispatch('FedLogOut').then(() => {
                        Message.error(err || 'Verification failed, please login again');
                        next({ path: '/' });
                    })
                })



            } else {
                console.log('++++++++++已登录权限校验++++++++++++');
                // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
                if (hasPermission(store.getters.roles, to.meta.roles)) {
                    next();//
                } else {
                    next({ path: '/401', replace: true, query: { noGoBack: true }});
                }
            }
        }
    } else {
        /* has no token*/
        console.log('*************未登录************');
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next('/login');
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    NProgress.done(); // 结束Progress

});
