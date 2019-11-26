<template>
  <el-container class="home-page">
    <el-aside width="200px">
      <el-menu :default-active="$route.path + menuActiveAfter" class="home-page-menu" :router="true">
        <el-menu-item index="/index" :route="{name: 'homeIndex'}">
          <i class="el-icon-s-home"></i>
          <span>Dashboard</span>
        </el-menu-item>
        <el-menu-item index="/plugins" :route="{name: 'homePlugins'}">
          <i class="el-icon-s-open"></i>
          <span>Plugins</span>
        </el-menu-item>
        <el-submenu index="documents">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>Documents</span>
          </template>
          <el-menu-item index="/documents-mofish" :route="{name: 'homeDocument', query: {doc: 'mofish'}}">
            Mofish
          </el-menu-item>
        </el-submenu>
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
      menuActiveAfter: ''
    }
  },
  methods: {
    refreshMenuActiveAfter (route) {
      if (route.name === 'homeDocument') {
        this.menuActiveAfter = '-' + ((route.query && route.query.doc) || '')
      } else {
        this.menuActiveAfter = ''
      }
    }
  },
  created () {
    this.refreshMenuActiveAfter(this.$route)
  },
  beforeRouteUpdate (to, from, next) {
    this.refreshMenuActiveAfter(to)
    next()
  },
  components: {
  }
}
</script>

<style lang="scss">
  .home-page {
    &-content {
      height: calc(100vh - 61px);
      padding: 20px;
    }
    &-menu {
      height: calc(100vh - 61px);
    }
  }
</style>
