import request from '../utils/customaxios'

const restfulApi = {

    /**
     * 获取数据列表(分页)
     * @param uri 必填
     * @param params
     * @returns {*}
     */
    list(uri, params = {}){
        return request({
            url: '/api/' + uri,
            method: 'get',
            data: params
        });
    },

    /**
     * 获取单条数据
     * @param uri 必填
     * @param id  必填
     * @returns {*}
     */
    item(uri, id){
        return request({
            url: '/api/' + uri + '/' + id,
            method: 'get',
            data: ''
        });
    },

    /**
     * 创建
     * @param uri 必填
     * @param params 必填
     * @returns {*}
     */
    create(uri, params){
        return request({
            url: '/api/' + uri,
            method: 'post',
            data: params
        });
    },

    /**
     * 编辑
     * @param uri  必填
     * @param id  必填
     * @param params  必填
     * @returns {IDBRequest | Promise<void>}
     */
    edit(uri, id, params){
        return request({
            url: '/api/' + uri + '/' + id,
            method: 'put',
            data: params
        });
    },

    /**
     * 删除
     * @param uri  必填
     * @param id   必填
     * @returns {*}
     */
    delete(uri, id){
        return request({
            url: '/api/' + uri + '/' + id,
            method: 'delete',
            data: ''
        });
    },
};

export default restfulApi;
