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

const whiteList = ['/login','/401','/404']; // 不重定向白名单

router.beforeEach((to, from, next) => {
    NProgress.start();
    if (TokenFactory.getToken()) {

        /* has token*/
        if (to.path === '/login') {
            next({ path: '/' });
            NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
        } else {
            console.log('____________初次登录_____________');

            if (store.getters.permission_routers.length === 0){
                store.dispatch('GetInfo').then(res => { // 拉取用户信息

                    store.dispatch('generateRoutes').then((res) => { // 拉取路由表

                    next({ ...to, replace: true });
                    })
                }).catch((err) => {

                    store.dispatch('FedLogOut').then(() => {
                        Message.error(err || 'Verification failed, please login again');
                        next({ path: '/' });
                    })
                })
            } else{
                next();
            }

        }
    } else {
        /* has no token*/
        console.log('*************未登录白名单校验************');
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
