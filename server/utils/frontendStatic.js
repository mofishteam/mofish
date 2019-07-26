import Koa from 'koa'
import koaStatic from 'koa-static'
const staticMap = {}
export const addStaticServer = (pluginInfo) => {
  const app = new Koa()
  app
    .use(koaStatic(pluginInfo.frontend))
  const server = app.listen(pluginInfo.port)
  staticMap[pluginInfo.pluginName] = {
    server,
    pluginInfo
  }
  console.log(`Plugin "${pluginInfo.pluginName}" frontend is running at ${pluginInfo.frontendPath}. Frontend path "${pluginInfo.frontend}"`)
}

export const deleteStaticServer = (pluginName) => {
  if (staticMap[pluginName].hasOwnProperty('server')) {
    staticMap[pluginName].server.close()
    console.log(`Plugin "${pluginName}" is stopped.`)
  }
}

export {
  staticMap
}
