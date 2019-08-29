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
      'refreshMofishVersion'
    ])
  },
  created () {
    this.refreshPlugins()
    this.refreshMofishVersion()
  }
}
</script>

<style lang="scss">
</style>
