import Router from '../utils/ipcRouter'
// import { response } from '../utils/response'
// import { setConfig, getConfig } from '../utils/configs'
// import { loadPlugin, unloadPlugin } from '../utils/loadPlugins'
const router = new Router()

router.prefix('/api/mofish')

router.set('/version', async () => {
  return require('../../package.json').version
})

export default router
