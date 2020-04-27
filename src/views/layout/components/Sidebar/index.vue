<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.name"
      :collapse="isCollapse"
      background-color="#6959CD"
      text-color="white"
      active-text-color="#42b983"
      @open="handleOpen"
      @close="handleClose"
      @select="handleMenuSelect"
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
  },
  methods:{
    handleOpen(key, keyPath) {
      this.$emit('submenuOpen',key, keyPath);
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      this.$emit('submenuClose',key, keyPath);
      // console.log(key, keyPath);
    },
    handleMenuSelect(key, keyPath){
      this.$emit('menuSelect',key, keyPath);
      // console.log(key, keyPath);
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .el-scrollbar__wrap{
    overflow-x: hidden !important;
  }
</style>
