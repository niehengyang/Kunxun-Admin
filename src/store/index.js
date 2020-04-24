import Vue from 'vue'
import Vuex from 'vuex'


import user from './modules/user'
import getters from './getters'
import permission from './modules/permission'
import common from './modules/common'
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        permission,
        common
    },
    getters
});

export default store
