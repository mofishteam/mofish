<template>
  <el-menu :router="true" :default-active="activeIndex" class="top-nav" mode="horizontal" @select="handleSelect">
    <el-menu-item index="index" class="home-index-menu-item">
      <logo></logo>
    </el-menu-item>
    <el-menu-item :index="plugin.name" :key="plugin.name" :route="{name: 'pluginPage', query: {name: plugin.name}}" v-for="plugin in pluginList">{{ plugin.name }}</el-menu-item>
  </el-menu>
</template>

<script>
import Logo from '@/components/Logo'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Nav',
  data () {
    return {
      activeIndex: 'index'
    }
  },
  async created () {
    await this.refreshProjects()
    if (this.$route.name === 'pluginPage') {
      this.activeIndex = this.$route.query.name
    } else {
      this.activeIndex = 'index'
    }
  },
  methods: {
    ...mapActions([
      'refreshProjects'
    ]),
    handleSelect () {}
  },
  computed: {
    ...mapGetters({
      pluginList: 'getPlugins'
    })
  },
  components: {
    Logo
  }
}
</script>

<style lang="scss">
  .top-nav {
    -webkit-app-region: drag;
    -webkit-user-select: none;
    .project-selector {
      position: fixed;
      right: 20px;
      top: 30px;
      transform: translateY(-50%);
    }
    .home-index-menu-item {
      -webkit-app-region: no-drag;
      &.el-menu-item.is-active {
        border-bottom: 0;
      }
    }
  }
</style>
