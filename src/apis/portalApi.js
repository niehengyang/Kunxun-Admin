
/**
 * 网站相关Api
 *
 */

import request from '../utils/customaxios'

export function login(username, password,captcha) {
    return request({
        url: '/api/user/login',
        method: 'post',
        data: {
            username,
            password,
            captcha
        }
    });
}

export function getInfo(token) {
    return request({
        url: '/api/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/api/user/logout',
        method: 'post'
    })
}

export function getMenus(token) {
    return request({
        url: '/api/web/menu',
        method: 'get',
        params: { token }
    })
}
