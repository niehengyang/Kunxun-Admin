
/**
 * 网站相关Api
 *
 */

import request from '../utils/customaxios'

export function login(loginname, password,captcha) {
    return request({
        url: '/api/auth/login/web',
        method: 'post',
        data: {
            loginname,
            password,
            captcha
        }
    });
}

export function getInfo(token) {
    return request({
        url: '/api/web/user',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/api/web/logout',
        method: 'post'
    })
}

export function getMenus(token) {
    return request({
        url: '/api/web/perm',
        method: 'get',
        params: { token }
    })
}

export function getMenuTree(token) {
    return request({
        url: '/api/web/menu',
        method: 'get',
        params: { token }
    })
}
