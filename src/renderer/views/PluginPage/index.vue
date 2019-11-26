<template>
  <div class="plugin-page" v-loading="isLoading">
    <iframe v-if="plugin && plugin.info && plugin.info.frontend" :src="plugin.info.frontend" frameborder="0" @load="onReady"></iframe>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PluginPage',
  data () {
    return {
      isLoading: true
    }
  },
  methods: {
    onReady () {
      this.isLoading = false
    }
  },
  computed: {
    ...mapGetters({
      pluginList: 'getPlugins'
    }),
    plugin () {
      const pluginName = this.$route.query.name
      for (const plugin of this.pluginList) {
        if (plugin.name === pluginName) {
          return plugin
        }
      }
      return null
    }
  }
}
</script>

<style lang="scss">
  .plugin-page {
    iframe {
      display: block;
      width: 100%;
      height: calc(100vh - 61px);
    }
  }
</style>
