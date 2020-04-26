import TokenFactory from '../../utils/tokenfactory' // get token from localStorage
import { login, logout, getInfo } from '../../apis/portalApi'

const user = {
    state: {
        token: TokenFactory.getToken(),
        name: '',
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
    },

    actions: {

        // 登录
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                    login(username, userInfo.password,userInfo.captcha).then(response => {
                    const data = response.data;
                        console.log(data);
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
                    const data = response.data;
                    commit('SET_NAME', data.name); //名称
                    // commit('SET_AVATAR', data.avatar);//头像
                    resolve(response.data)
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
                    commit('SET_MENUS', []);//权限树
                    TokenFactory.clearToken();
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                TokenFactory.clearToken();
                resolve()
            })
        }
    }
};

export default user;
