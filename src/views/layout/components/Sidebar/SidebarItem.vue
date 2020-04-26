<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="item.children">

      <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children" :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.children[0].meta&&item.children[0].icon" :icon-class="item.children[0].icon"></svg-icon>
          <span v-if="item.children[0]&&item.children[0].name" slot="title">{{item.children[0].name}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <svg-icon v-if="item&&item.icon" :icon-class="item.icon"></svg-icon>
          <span v-if="item&&item.name" slot="title">{{item.name}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <svg-icon v-if="child&&child.icon" :icon-class="child.icon"></svg-icon>
              <span v-if="child&&child.name" slot="title">{{child.name}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      });

      if (showingChildren.length === 1) {
        return true
      }
      return false
    }
  },
  created() {

  }
}
</script>


<style>
  .el-submenu .el-menu-item{
    background: #7171C6 !important;
  }

</style>
