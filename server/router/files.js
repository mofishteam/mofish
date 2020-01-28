import Router from '../utils/ipcRouter'
// import { response } from '../utils/response'
// import fs from 'fs'
// import path from 'path'
import { dialog } from 'electron'
// import { setConfig, getConfig } from '../utils/configs'
// import { loadPlugin, unloadPlugin } from '../utils/loadPlugins'
const router = new Router()

router.prefix('/file')

router.set('/getFilePath', async (arg = {}) => {
  const { data } = arg
  const { options } = data || {}
  console.log('getFilePath options, ', options, arg)
  return dialog.showOpenDialog(options)
})

export default router
