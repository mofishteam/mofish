<template>
  <div id="app">
    <nav-header></nav-header>
    <router-view/>
  </div>
</template>

<script>
import NavHeader from '@/components/Nav/index.vue'
import { mapActions } from 'vuex'
import { sleep } from '@/utils/index.js'
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
  async created () {
    this.refreshLocalPlugins()
    await this.refreshPlugins()
    this.refreshMofishInfo()
    await sleep(2000)
    await this.refreshOnlinePlugins()
  }
}
</script>

<style lang="scss">
</style>
