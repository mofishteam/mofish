import Vue from 'vue'
import Vuex from 'vuex'
import { getPlugins, getMofishVersion } from '@/api/service/plugins'
import { getProjects } from '@/api/service/projects'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    plugins: [],
    projects: [],
    mofishVersion: ''
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
    refreshMofishVersion ({ commit }) {
      getMofishVersion().then(res => {
        if (!res.result) {
          commit('SET_MOFISH_VERSION', res.data)
        }
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
    getMofishVersion (state) {
      return state.mofishVersion || ''
    }
  }
})
