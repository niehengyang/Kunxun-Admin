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
