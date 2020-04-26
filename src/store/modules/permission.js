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
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes)
  }
};

const actions = {

  generateRoutes({ commit }, roles) {
    return new Promise((resolve, reject) => {
      getPermissions(state.token).then(response => {
        const data = response.data;
        commit('SET_PERMISSIONS', data.permissions);//权限树
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
