import Vue from 'vue'
import App from './App.vue'

/** 第三方通用组件 **/
require("../src/bootstrap/3rd");

Vue.config.productionTip = false;

import store from '../src/store/index'
import router from '../src/router/index'


//权限校验
import'../src/utils/permission'

//引入Api
// import portalApi from "./apis/portalApi";

// portalApi.initData().then(function (res) {
//
//   window.__login_user__ = res.data;
//
//   new Vue(Vue.util.extend({router,store}, App)).$mount('#app');
// });


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
