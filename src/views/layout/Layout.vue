<template>
  <div class="app-wrapper" :class="classObj">
    <!------菜单控件------>
    <!--<div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>-->

    <!------左侧菜单------>
    <sidebar v-if="navLocation == 'sidebar'" class="sidebar-container"></sidebar>

    <div class="main-container" :style="navLocation == 'sidebar' ? 'margin-left: 210px;' : '0'">

      <!------递增导航------>
      <navbar></navbar>

      <!---------主要内容------------>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'

export default {
  name: 'layout',
    data(){
      return {
          navLocation: 'sidebar',//topbar  导航栏显示位置
      }
    },
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [],
  computed: {

    classObj() {
      return {

      }
    }
  },
  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @mixin clearfix {
    &:after {
      content: "";
      display: table;
      clear: both;
    }
  }

  @mixin scrollBar {
    &::-webkit-scrollbar-track-piece {
      background: #d3dce6;
    }
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: #99a9bf;
      border-radius: 20px;
    }
  }

  @mixin relative {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .sidebar-container{
    transition: width .28s;
    width: 210px !important;
    height: 100%;
    position: fixed;
    font-size: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    background: #6959CD;
  }
  /*.main-container{*/
  /*  margin-left: 210px;*/
  /*}*/
</style>
