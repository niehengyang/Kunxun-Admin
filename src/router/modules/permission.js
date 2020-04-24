// 权限管理路由
import PermissionList from '../../../src/views/permission/Index.vue';

const PermissionRouter = [
    {
        path: '/permission/list/',
        name: 'permissionList',
        component: PermissionList
    },
];
export default PermissionRouter;
