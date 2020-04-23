// 用户管理路由
import AccountList from '../../../src/views/account/Index.vue';

const AccountRouter = [
    {
        path: '/account/list/',
        name: 'accountList',
        component: AccountList
    },
];
export default AccountRouter;
