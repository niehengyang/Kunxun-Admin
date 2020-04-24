<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <router-view></router-view>
  </div>
</template>
<style src="../src/assets/css/app.css"></style>
<script>
import HelloWorld from './components/HelloWorld.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data(){
    return{

    }
  },
  components: {
    HelloWorld
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created(){

  },
  methods:{

  }
}
</script>

<style>
#app {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  transform-style: preserve-3d;
  visibility: visible;
}
</style>
