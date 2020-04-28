<template>
  <div class="menu-wrapper">
    <label v-for="menu in routes" :key="menu.uid">
      <el-submenu :index="menu.uid" v-if="menu.children">
        <template slot="title">
          <i :class="menu.icon"></i>
          <span>{{menu.name}}</span>
        </template>
        <label>
          <SidebarItem :routes="menu.children"></SidebarItem>
        </label>
      </el-submenu>
      <el-menu-item v-else :index="menu.uid">
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.name}}</span>
      </el-menu-item>
    </label>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
  },
  methods: {

  },
  created() {

  }
}
</script>


<style>
  .el-submenu .el-menu-item{
    background: #7171C6 !important;
  }
  .el-submenu .el-menu-item:hover{
    background: #473c8b !important;
  }


</style>
