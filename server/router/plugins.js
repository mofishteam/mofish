import Router from 'koa-router'
import { response, check } from '../utils/response'
import { setConfig, getConfig } from '../utils/configs'
const router = new Router()

router.prefix('/api/plugins')

router.get('/list', async (ctx, next) => {
  const result = (getConfig().plugins || []).map(plugin => ({
    ...plugin,
    info: global.pluginInfo[plugin.name]
  }))
  response(ctx, 200, result)
  await next()
})

router.delete('/delete', async (ctx, next) => {
  const query = ctx.request.query
  if (!check(query, [['name', 'string']])) {
    response(ctx, 400, null, {
      message: 'Param error, check it and retry.'
    })
    await next()
    return
  }
  const { name } = query
  const curConfig = getConfig()
  curConfig.plugins = (curConfig.plugins || []).filter(item => item.name !== name)
  setConfig(curConfig)
  response(ctx, 200, null)
  await next()
})

router.post('/add', async (ctx, next) => {
  const body = ctx.request.body
  const { name, type, path } = body
  if (!check(body, [['name', 'string'], ['type', 'string']])) {
    response(ctx, 400, null, {
      message: 'Param error, check it and retry.'
    })
    await next()
    return
  }
  const curConfig = getConfig()
  let hasPlugin = false
  for (const plugin of curConfig.plugins || []) {
    if (plugin.name === name) {
      hasPlugin = true
    }
  }
  if (hasPlugin) {
    response(ctx, 400, null, {
      message: `Plugin ${name} is already in plugin list.`
    })
  } else {
    const plugins = curConfig.plugins || []
    switch (type) {
      case 'local': plugins.push({
        name,
        type,
        path
      })
    }
    setConfig({
      ...curConfig,
      plugins
    })
    response(ctx, 200, null)
  }
  await next()
})

export default router
