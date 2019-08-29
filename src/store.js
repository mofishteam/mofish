import Vue from 'vue'
import Vuex from 'vuex'
import { getPlugins, getMofishVersion } from '@/api/service/plugins'
import { searchPackages, getLocalPackages } from '@/api/service/packages'
import { getProjects } from '@/api/service/projects'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    plugins: [],
    onlinePlugins: null,
    localPlugins: null,
    projects: [],
    mofishVersion: '',
    mofishOnlineInfo: null
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
    }
  },
  actions: {
    refreshPlugins ({ commit }) {
      getPlugins().then(res => {
        if (!res.result) {
          commit('SET_PLUGINS', res.data)
        }
      })
    },
    refreshProjects ({ commit }) {
      getProjects().then(res => {
        if (!res.result) {
          commit('SET_PROJECTS', res.data)
        }
      })
    },
    refreshOnlinePlugins ({ commit }) {
      commit('SET_ONLINE_PLUGINS', null)
      searchPackages({
        name: 'mofish-plugin-'
      }).then(res => {
        if (res.data) {
          commit('SET_ONLINE_PLUGINS', res.data)
        }
      })
    },
    refreshLocalPlugins ({ commit }) {
      commit('SET_LOCAL_PLUGINS', null)
      getLocalPackages().then(res => {
        if (res.data) {
          commit('SET_LOCAL_PLUGINS', res.data)
        }
      })
    },
    async refreshMofishInfo ({ commit }) {
      commit('SET_MOFISH_ONLINE_INFO', 'checking')
      await getMofishVersion().then(res => {
        if (!res.result) {
          commit('SET_MOFISH_VERSION', res.data)
        }
      })
      await searchPackages({ name: 'mofish' }).then(res => {
        if (!res.result && res.data && res.data.length) {
          for (const item of res.data) {
            if (item.name === 'mofish') {
              commit('SET_MOFISH_ONLINE_INFO', item)
            }
          }
        }
      }).catch(() => {
        commit('SET_MOFISH_ONLINE_INFO', 'failed')
      })
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
    }
  }
})
