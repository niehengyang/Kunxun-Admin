
const permission = {
  state: {
    menus: [],
  },
  mutations: {
    SET_MENUS: (state, menus) => {
      state.menus = menus;
    }
  },

  actions: {
    generateRoutes({commit, state}) {
      return new Promise((resolve, reject) => {
        getMenus(state.token).then(response => {
          const data = response.data;
          if (data && data.length > 0) { // 验证返回的menu是否是一个非空数组
            commit('SET_MENUS', data);//权限树
          } else {
            reject('getInfo: menus must be a non-null array !')
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
