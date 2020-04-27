<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#6959CD"
      text-color="white"
      active-text-color="#42b983"
    >
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'

import SidebarItem from './SidebarItem'

export default {
  data(){
    return{
      permissionsData: [
        {
          id: '6',
          name: '个人算法',
          parentId: '0',
          hasChildren: true,
          parentName: null,
          url: '',
          actionUrl: '',
          visible: '1',
          check: false,
          children: [
            {
              id: '1',
              name: '用户管理',
              parentId: '6',
              hasChildren: false,
              parentName: "个人算法",
              text: "用户管理",
              url: "/alm/user/list",
              actionUrl: '/user/list',
              children: []
            },
            {
              id: '2',
              name: '策略设置',
              parentId: '6',
              hasChildren: false,
              parentName: "个人算法",
              text: "策略设置",
              url: "/alm/strategy/list",
              actionUrl: '/strategy/list',
              children: []
            }
          ]
        },
        {
          id: '8',
          name: '个人方案',
          parentId: '0',
          hasChildren: true,
          parentName: null,
          url: '',
          actionUrl: '',
          visible: '1',
          check: false,
          children: [
            {
              id: '3',
              name: '方案管理',
              parentId: '8',
              hasChildren: false,
              parentName: "个人方案",
              text: "方案管理",
              url: "/alm/programme/list",
              actionUrl: '/programme/list',
              children: []
            },
            {
              id: '4',
              name: '数据统计',
              parentId: '8',
              hasChildren: false,
              parentName: "个人方案",
              text: "数据统计",
              url: "/alm/datas/list",
              actionUrl: '/datas/list',
              children: []
            }
          ]
        }
      ]
    }
  },
  components: { SidebarItem},
  computed: {
    ...mapGetters([
      'sidebar',
      'permission_routers'
    ]),

    isCollapse() {
      // return !this.sidebar.opened
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .el-scrollbar__wrap{
    overflow-x: hidden !important;
  }
</style>
