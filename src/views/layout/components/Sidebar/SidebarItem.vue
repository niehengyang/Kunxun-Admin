<template>
  <div class="menu-wrapper">
    <!--<template v-for="item in routes" v-if="item.children">-->

      <!--<router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children" :to="item.children[0].router"-->
                   <!--:key="item.children[0].name">-->
        <!--<el-menu-item :index="item.children[0].uid" :class="">-->
          <!--&lt;!&ndash;<svg-icon v-if="item.children[0].meta&&item.children[0].icon" :icon-class="item.children[0].icon"></svg-icon>&ndash;&gt;-->
          <!--<span v-if="item.children[0]&&item.children[0].name" slot="title">{{item.children[0].name}}</span>-->
        <!--</el-menu-item>-->
      <!--</router-link>-->

      <!--<el-submenu v-else :index="item.uid" :key="item.uid">-->
        <!--<template slot="title">-->
          <!--&lt;!&ndash;<svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>&ndash;&gt;-->
          <!--<span v-if="item&&item.name" slot="title">{{item.children[0].name}}</span>-->
        <!--</template>-->

        <!--<template v-for="child in item.children" >-->
          <!--<sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.uid"></sidebar-item>-->

          <!--<router-link v-else :to="child.router" :key="child.name">-->
            <!--<el-menu-item :index="child.router">-->
              <!--&lt;!&ndash;<svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>&ndash;&gt;-->
              <!--<span v-if="child&&child.name" slot="title">{{child.name}}</span>-->
            <!--</el-menu-item>-->
          <!--</router-link>-->
        <!--</template>-->
      <!--</el-submenu>-->

    <!--</template>-->

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
    isNest: {
      type: Boolean,
      default: false
    },
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
  .el-submenu .el-menu-item:hover{
    background: #473c8b !important;
  }


</style>
