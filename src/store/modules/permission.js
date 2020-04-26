import { asyncRoutes, constantRoutes } from '../../router/index'
import {getInfo,getPermissions} from "../../apis/portalApi";

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  });

  return res
}

const state = {
  routes: [],
  addRoutes: [],
  permissions: []
};

const mutations = {

  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes)
  },
  SET_PERMISSIONS: (state, permissions)=>{
    state.permissions = permissions
  }
};

const actions = {

  generateRoutes({ commit, state }) {
    return new Promise((resolve, reject) => {
      getMenus(state.token).then(response => {
        const data = response.data;
        if (data && data.length > 0) { // 验证返回的roles是否是一个非空数组
          commit('SET_PERMISSIONS', data.permissions);//权限树
        } else {
          reject('getInfo: roles must be a non-null array !')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }

};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
