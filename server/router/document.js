import Router from 'koa-router'
import { response } from '../utils/response'
import fs from 'fs'
import path from 'path'
// import { setConfig, getConfig } from '../utils/configs'
// import { loadPlugin, unloadPlugin } from '../utils/loadPlugins'
const router = new Router()

router.prefix('/api/document')

router.get('/mofish', async (ctx, next) => {
  response(ctx, 200, {
    type: 'markdown',
    content: fs.readFileSync(path.join(__dirname, '../../README.md')).toString()
  })
  await next()
})

export default router
