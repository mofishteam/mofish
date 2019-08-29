import Router from 'koa-router'
import { response } from '../utils/response'
// import { setConfig, getConfig } from '../utils/configs'
// import { loadPlugin, unloadPlugin } from '../utils/loadPlugins'
const router = new Router()

router.prefix('/api/mofish')

router.get('/version', async (ctx, next) => {
  response(ctx, 200, require('../../package.json').version)
  await next()
})

export default router
