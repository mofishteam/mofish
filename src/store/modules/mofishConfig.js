import Vuex from 'vuex'
import readFile from '@/utils/readFile'
import config from '@/config/index'
import electron from 'electron'
const path = electron.remote.require('path')

export default new Vuex.Store({
  state: {
    mofishConfig: {}
  },
  mutations: {
    REFRESH_MOFISH_CONFIG (state) {}
  },
  actions: {
    async refreshMofishConfig ({ commit }) {
      console.log('refreshMofishConfig')
      console.log(await readFile(path.join(config.dataPath, 'config.json')).catch(err => {
        console.log(err)
      }))
      commit('REFRESH_MOFISH_CONFIG')
    }
  },
  getters: {
    getMofishConfig (state) {
      return state.mofishConfig
    }
  }
})
