import Vue from 'vue'
import Vuex from 'vuex'
import { getPlugins, getMofishVersion } from '@/api/service/plugins'
import { searchPackages, getLocalPackages } from '@/api/service/packages'
import { getProjects } from '@/api/service/projects'
import electron from 'electron'
import config from '@/config/index'
import readFile from '@/utils/readFile'
const path = electron.remote.require('path')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    plugins: [],
    onlinePlugins: null,
    localPlugins: null,
    projects: [],
    mofishVersion: '',
    mofishOnlineInfo: null,
    mofishConfig: {}
  },
  mutations: {
    SET_PLUGINS (state, val) {
      state.plugins = val
    },
    SET_PROJECTS (state, val) {
      state.projects = val
    },
    SET_MOFISH_VERSION (state, val) {
      state.mofishVersion = val
    },
    SET_MOFISH_ONLINE_INFO (state, val) {
      state.mofishOnlineInfo = val
    },
    SET_ONLINE_PLUGINS (state, val) {
      state.onlinePlugins = val
    },
    SET_LOCAL_PLUGINS (state, val) {
      state.localPlugins = val
    },
    REFRESH_MOFISH_CONFIG (state) {}
  },
  actions: {
    refreshPlugins ({ commit }) {
      return getPlugins().then(res => {
        if (!res.result) {
          commit('SET_PLUGINS', res.data)
        }
      })
    },
    refreshProjects ({ commit }) {
      return getProjects().then(res => {
        if (!res.result) {
          commit('SET_PROJECTS', res.data)
        }
      })
    },
    refreshOnlinePlugins ({ commit }) {
      commit('SET_ONLINE_PLUGINS', null)
      return searchPackages({
        name: 'mofish-plugin-'
      }).then(res => {
        console.log('refreshOnlinePlugins, ', res)
        if (res instanceof Array) {
          commit('SET_ONLINE_PLUGINS', res)
        }
      })
    },
    refreshLocalPlugins ({ commit }) {
      commit('SET_LOCAL_PLUGINS', null)
      return getLocalPackages().then(res => {
        if (res instanceof Array) {
          commit('SET_LOCAL_PLUGINS', res)
        }
      })
    },
    async refreshMofishInfo ({ commit }) {
      commit('SET_MOFISH_ONLINE_INFO', 'checking')
      await getMofishVersion().then(res => {
        if (res) {
          console.log(res)
          commit('SET_MOFISH_VERSION', res)
        }
      })
      await searchPackages({ name: 'mofish' }).then(res => {
        console.log(res)
        if (res instanceof Array) {
          for (const item of res) {
            if (item.name === 'mofish') {
              commit('SET_MOFISH_ONLINE_INFO', item)
            }
          }
        }
      }).catch(() => {
        commit('SET_MOFISH_ONLINE_INFO', 'failed')
      })
    },
    async refreshMofishConfig ({ commit }) {
      console.log('refreshMofishConfig')
      console.log(await readFile(path.join(config.dataPath, 'config.json'), 'json').catch(err => {
        console.log(err)
      }))
      commit('REFRESH_MOFISH_CONFIG')
    }
  },
  getters: {
    getPlugins (state) {
      return state.plugins
    },
    getProjects (state) {
      return state.projects
    },
    getMofishInfo (state) {
      return {
        version: state.mofishVersion || '',
        onlineInfo: state.mofishOnlineInfo
      }
    },
    getLocalPlugins (state) {
      return state.localPlugins
    },
    getOnlinePlugins (state) {
      return state.onlinePlugins
    },
    getMofishConfig (state) {
      return state.mofishConfig
    }
  },
  modules: {
    // mofishConfig: require('./modules/mofishConfig')
  }
})
