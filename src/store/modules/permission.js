import { getMenus,getMenuTree} from '../../apis/portalApi'
import {asyncRouters} from "../../router/async";
import {constantRoutes} from "../../router";



/**
 * 通过uid判断是否与当前用户权限匹配
 * @param permissions
 * @param route
 */
function hasPermission(permissions, route) {
  if (route.name) {
    let scar = route.name;
    return permissions.indexOf(scar) >= 0; //方法一
    // return permissions.some(perm => perm == scar) //方法二
  } else {
    return true
  }
}

/**
 * 过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param permissions //用户拥有的权限
 */
function filterAsyncRouter(asyncRouterMap, permissions) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(permissions, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children,permissions)
      }
      return true
    }
    return false
  });
  return accessedRouters
}


const permission = {
  state: {
    menus: [],
    addRouters: [],
  },
  mutations: {
    SET_MENUS: (state, menus) => {
      state.menus = menus;
    },

    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
    }
  },

  actions: {
    generateRoutes({commit, state}) {
      return new Promise((resolve, reject) => {
        getMenus(state.token).then(response => {
          const data = Object.keys(response.data);
          let accessedRouters;
          if (data && data.length > 0) { // 验证返回的data是否是一个非空数组
            accessedRouters = filterAsyncRouter(asyncRouters, data);
            constantRoutes[0].children = constantRoutes[0].children.concat(accessedRouters);
            commit('SET_ROUTERS', constantRoutes);
          } else {
            reject('getMenus: menus must be a non-null array !')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetMenuTree({commit, state}){
      return new Promise((resolve, reject) => {
        getMenuTree(state.token).then(response => {
          const data = response.data;
          if (data && data.length > 0) { // 验证返回的data是否是一个非空数组
            commit('SET_MENUS', data);//权限树
          } else {
            reject('getMenuTree: menus must be a non-null array !')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
};

export default permission
