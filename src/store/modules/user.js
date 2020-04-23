import TokenFactory from '../../utils/tokenfactory' // get token from localStorage
import { login, logout, getInfo } from '../../apis/portalApi'

const user = {
    state: {
        token: TokenFactory.getToken(),
        name: '',
        roles: [],
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
    },

    actions: {

        // 登录
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                login(username, userInfo.password).then(response => {
                    const data = response;
                    TokenFactory.setToken(data.token);
                    commit('SET_TOKEN', data.token);
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo(state.token).then(response => {
                    const data = response;
                    if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        commit('SET_ROLES', data.roles)
                    } else {
                        reject('getInfo: roles must be a non-null array !')
                    }
                    commit('SET_NAME', data.name);
                    commit('SET_AVATAR', data.avatar);
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', []);
                    // commit('CLEAR_LOCK');
                    TokenFactory.clearToken();
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // // 前端 登出
        // FedLogOut({ commit }) {
        //     return new Promise(resolve => {
        //         commit('SET_TOKEN', '');
        //         TokenFactory.clearToken();
        //         resolve()
        //     })
        // },
        // // 动态修改权限
        // ChangeRoles({ commit }, role) {
        //     return new Promise(resolve => {
        //         commit('SET_TOKEN', role);
        //         TokenFactory.setToken(role);
        //         getInfo(role).then(response => {
        //             const data = response;
        //             commit('SET_ROLES', data.roles);
        //             commit('SET_NAME', data.name);
        //             commit('SET_AVATAR', data.avatar);
        //             resolve()
        //         })
        //     })
        // }
    }
};

export default user
