<template>
  <div id="app">
      <router-view  class="app-router-view"></router-view>
  </div>
</template>
<style src="../src/assets/css/app.css"></style>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  data(){
    return{

    }
  },
  components: {
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
#app .app-router-view{
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
