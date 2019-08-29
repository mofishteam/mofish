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
      <el-col span="12">
        <el-card shadow="hover">
          <p class="intro-title text-main-black">Welcome to use Mofish.</p>
          <p class="intro-text">
            <span>To add or remove plugins, </span>
            <router-link :to="{name: 'homePlugins'}">
              <el-link type="primary">click here</el-link>
            </router-link>
            <span>.</span></p>
        </el-card>
      </el-col>
      <el-col span="12">
        <el-card shadow="hover">
          <p class="intro-title text-main-black">Plugins</p>
          <p class="intro-text text-common-black">Current Mofish Version: <span class="text-success">{{mofishVersion}}</span></p>
          <p class="intro-text text-common-black" :key="$index" v-for="(plugin, $index) in pluginList">
            Plugin <span class="plugin-name">{{plugin.name}}</span> Version: <span class="text-success">{{((plugin || {}).info || {}).packageJson | filterVersion}}</span>
          </p>
        </el-card>`
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters({
      pluginList: 'getPlugins',
      mofishVersion: 'getMofishVersion'
    })
  }
}
</script>

<style lang="scss">
  @import "~@/assets/style/base.scss";
  .home-index {
    max-width: 1280px;
    min-width: 800px;
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
