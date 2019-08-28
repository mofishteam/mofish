<template>
  <el-container class="home-page">
    <el-aside width="200px">
      <el-menu :default-active="$route.name" class="home-page-menu" :router="true">
        <el-menu-item index="homeIndex" :route="{name: 'homeIndex'}">
          <i class="el-icon-s-home"></i>
          <span>Home</span>
        </el-menu-item>
        <el-menu-item index="homePlugins" :route="{name: 'homePlugins'}">
          <i class="el-icon-s-open"></i>
          <span>Plugins</span>
        </el-menu-item>
<!--        <el-menu-item index="homeBackups" :route="{name: 'homeBackups'}">-->
<!--          <i class="el-icon-document-copy"></i>-->
<!--          <span>Backups</span>-->
<!--        </el-menu-item>-->
      </el-menu>
    </el-aside>
    <el-main class="home-page-content">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
    }
  },
  components: {
  }
}
</script>

<style lang="scss">
  .home-page {
    &-content {
      padding: 20px;
    }
    &-menu {
      height: calc(100vh - 61px);
    }
  }
</style>
