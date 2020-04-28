import Vue from 'vue'
import App from './App.vue'

/** 第三方通用组件 **/
require("../src/bootstrap/3rd");

Vue.config.productionTip = false;

import store from '../src/store/index'
import router from '../src/router/index'
console.log(process.env)

/* api统一出口 */
import apis from '../src/apis/index'
Vue.prototype.$api = apis

//权限校验
import'./utils/permission'


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
