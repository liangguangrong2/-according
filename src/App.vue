<template>
  <div id="app">
      <div class="main">
          <!-- 顶部组件 -->
          <header-navs v-if="!$route.meta.headerflag"></header-navs>
          
          <!-- 路由视图 -->
          <router-view></router-view>

          <!-- 播放音乐 -->
          <player></player>
      </div>
  </div>
</template>

<script>
import headerNavs from "./components/base/headerNavs"
import player from "./components/base/player";

export default {
  data() {
    return {
      headerflag: true,
    }
  },
  components:{
      headerNavs,
      player
  },
  
}
</script>

<style lang="less">
// @import "./assets/css/base.css";
html,body,#app{
    width: 100%;
    height: 100%;
}


</style>
