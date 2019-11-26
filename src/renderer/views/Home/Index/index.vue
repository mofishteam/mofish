<template>
  <div class="home-index">
    <el-card class="home-index-card" shadow="hover">
      <section class="home-index-logo-row">
        <logo :canvas-width="400" :canvas-height="240" :has-shadow="true"></logo>
        <div class="home-index-logo-row_text">
          <p class="title text-main-black">Mofish</p>
          <p class="description text-secondary-black">A friendly and open source Development Tool.</p>
        </div>
      </section>
    </el-card>
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card shadow="hover">
          <p class="intro-title text-main-black">Welcome to Mofish World.</p>
          <p class="intro-text">NPM Mofish plugins count: <span :class="onlinePlugins ? 'text-main' : 'text-info'">{{onlinePlugins ? onlinePlugins.length : 'Searching...'}}</span></p>
          <p class="intro-text">Local Mofish plugins count: <span :class="localPlugins ? 'text-main' : 'text-info'">{{localPlugins ? localPlugins.length : 'Searching...'}}</span></p>
          <p class="intro-text">
            <span>To add or remove plugins, </span>
            <router-link :to="{name: 'homePlugins'}">
              <el-link type="primary">click here</el-link>
            </router-link>
            <span>.</span></p>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <p class="intro-title text-main-black">Plugins</p>
          <p class="intro-text text-common-black">
            <span>Current Mofish Version: </span>
            <span :class="mofishVersionClassName">{{mofishInfo.version}}</span>
            <template v-if="mofishVersionNeedUpdate === true">
              <span> (</span><el-link type="warning" @click="updateMofish">UPDATE<span> to {{mofishInfo.onlineInfo.version}}</span></el-link><span>)</span>
            </template>
            <template v-if="mofishVersionNeedUpdate === 'checking'">
              <span> (<span class="text-info">Checking...</span>)</span>
            </template>
            <template v-if="mofishVersionNeedUpdate === 'failed'">
              <span> (<span class="text-info">VERSION CHECK FAILED</span>, <el-link type="primary" @click="refreshMofishInfo()">Retry</el-link>)</span>
            </template>
          </p>
          <p class="intro-text text-common-black" :key="$index" v-for="(plugin, $index) in pluginList">
            <span>Plugin </span>
            <span class="plugin-name">{{plugin.name}}</span>
            <span> Version: </span>
            <span :class="getPluginClass(pluginNeedUpdate(plugin))">{{((plugin || {}).info || {}).packageJson | filterVersion}}</span>
            <template v-if="pluginNeedUpdate(plugin) === true">
              <span> (<span class="text-warning">NEED UPDATE</span>)</span>
            </template>
            <template v-if="pluginNeedUpdate(plugin) === 'checking'">
              <span> (<span class="text-info">Checking</span>)</span>
            </template>
            <template v-if="pluginNeedUpdate(plugin) === 'local'">
              <el-tag size="mini">Local</el-tag>
            </template>
          </p>
          <p class="intro-text text-warning" v-if="!(pluginList && pluginList.length)">
            <span>There's no plugin in Mofish, </span>
            <router-link :to="{name: 'homePlugins', query: {add: 'true'}}">
              <el-link type="primary">click here</el-link>
            </router-link>
            <span> to add new plugin.</span>
          </p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Logo from '@/components/Logo'
export default {
  name: 'HomeIndex',
  components: {
    Logo
  },
  filters: {
    filterVersion (packageJson) {
      return packageJson.version
    }
  },
  methods: {
    ...mapActions([
      'refreshMofishInfo'
    ]),
    updateMofish () {
      this.$alert('Sorry, we didn\'t support this feature on the web service yet, please stop the Mofish command and run "npm install mofish -g && mofish" instead. Thanks for your understand.')
    },
    getPluginClass (needUpdate) {
      switch (needUpdate) {
        case true: return 'text-danger'
        case false: return 'text-success'
        case 'checking': return 'text-info'
        case 'local': return 'text-info'
      }
    },
    pluginNeedUpdate (plugin) {
      if (plugin && plugin.info && plugin.info.packageJson && this.onlinePlugins && this.onlinePlugins.length) {
        for (const item of this.onlinePlugins) {
          if (item.name === plugin.info.packageJson.name) {
            return item.version !== plugin.info.packageJson.version
          }
        }
        return 'local'
      } else {
        return 'checking'
      }
    }
  },
  created () {
  },
  computed: {
    ...mapGetters({
      pluginList: 'getPlugins',
      mofishInfo: 'getMofishInfo',
      onlinePlugins: 'getOnlinePlugins',
      localPlugins: 'getLocalPlugins'
    }),
    mofishVersionClassName () {
      switch (this.mofishVersionNeedUpdate) {
        case true: return 'text-danger'
        case false: return 'text-success'
        case 'checking': return 'text-info'
        default: return 'text-info'
      }
    },
    mofishVersionNeedUpdate () {
      if (this.mofishInfo.onlineInfo === 'failed') {
        return 'failed'
      } else if (this.mofishInfo.onlineInfo === 'checking') {
        return 'checking'
      } else if (this.mofishInfo && this.mofishInfo.version && this.mofishInfo.onlineInfo && this.mofishInfo.onlineInfo.version) {
        return this.mofishInfo.version !== this.mofishInfo.onlineInfo.version
      } else {
        return 'checking'
      }
    }
  }
}
</script>

<style lang="scss">
  @import "~@/assets/style/base.scss";
  .home-index {
    max-width: 1280px;
    min-width: 800px;
    margin: 0 auto;
    .home-index-card {
      position: relative;
      margin: 0 auto;
      .home-index-logo-row {
        display: flex;
        justify-content: center;
        .logo {
          width: 300px;
          min-width: 300px;
          height: 180px;
          position: relative;
          margin-left: -20px;
          &:after {
            content: '';
            width: 1px;
            height: 100%;
            background-color: $third-level-border-color;
            display: block;
            position: absolute;
            right: 0;
            top: 0;
          }
        }
        .home-index-logo-row_text {
          flex: 1;
          display: flex;
          padding-left: 20px;
          flex-direction: column;
          justify-content: center;
          .title {
            font-size: 30px;
          }
          .description {
            font-size: 22px;
          }
        }
      }
    }
    .intro-title {
      font-size: 22px;
      & + .intro-text {
        margin-top: 15px;
      }
    }
    .intro-text {
      font-size: 16px;
      & + .intro-text {
        margin-top: 10px;
      }
    }
    .plugin-name {
      text-decoration: underline;
    }
  }
</style>
