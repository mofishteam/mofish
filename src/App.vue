<template>
  <div id="app">
    <nav-header></nav-header>
    <router-view/>
  </div>
</template>

<script>
import NavHeader from '@/components/Nav/index.vue'
import { mapActions } from 'vuex'
export default {
  name: 'App',
  components: {
    NavHeader
  },
  methods: {
    ...mapActions([
      'refreshPlugins',
      'refreshMofishInfo',
      'refreshOnlinePlugins',
      'refreshLocalPlugins'
    ])
  },
  created () {
    this.refreshPlugins()
    this.refreshMofishInfo()
    this.refreshOnlinePlugins()
    this.refreshLocalPlugins()
  }
}
</script>

<style lang="scss">
</style>
