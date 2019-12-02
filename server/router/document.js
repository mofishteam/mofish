import Router from '../utils/ipcRouter'
// import { response } from '../utils/response'
import fs from 'fs'
import path from 'path'
// import { setConfig, getConfig } from '../utils/configs'
// import { loadPlugin, unloadPlugin } from '../utils/loadPlugins'
const router = new Router()

router.prefix('/api/document')

router.set('/mofish', async (arg) => {
  return {
    type: 'markdown',
    content: fs.readFileSync(path.join(__dirname, '../../README.md')).toString()
  }
})

export default router
