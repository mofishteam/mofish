// import config from './config'
import '@babel/polyfill'
import './utils/commander'
import { getConfig } from './utils/configs'
import { getValidPort } from './utils/portInUsed'
import loadPlugins from './utils/loadPlugins'
import PluginsRouter from './router/plugins'
import PluginRouter from './router/plugin'
import ProjectRouter from './router/projects'
import PackageRouter from './router/packages'
import MofishRouter from './router/mofish'
import getGlobalConfig from './config/index'
import Static from 'koa-static'
import eventBus from './utils/eventBus'
// import Proxy from 'koa-server-http-proxy'
// import { getLocalPackages } from './utils/getPackages'
// import libnpmsearch from 'libnpmsearch'
// import Mount from 'koa-mount'
// import FrontendRouter from './router/frontend'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
// import koaStatic from 'koa-static'
export default async function () {
  // console.log(await libnpmsearch('vue'))
  const settings = getConfig()
  global.settings = settings
  global.eventBus = eventBus

  const app = new Koa()

  await loadPlugins(settings)

  const config = getGlobalConfig(global.commander.dev)
  if (global.commander.dev) {
    console.log('Mofish is running in Development Mode.')
  } else {
    app.use(Static(config.frontendPath))
  }

  app
    .use(bodyParser())
    .use(PluginsRouter.routes())
    .use(PluginsRouter.allowedMethods())
    .use(PluginRouter.routes())
    .use(PluginRouter.allowedMethods())
    .use(ProjectRouter.routes())
    .use(ProjectRouter.allowedMethods())
    .use(PackageRouter.routes())
    .use(PackageRouter.allowedMethods())
    .use(MofishRouter.routes())
    .use(MofishRouter.allowedMethods())

  const port = await getValidPort(settings.port || global.commander.port || 8080)
  app.listen(port)
  eventBus.$emit('serverStart', {
    port
  })

  console.log(`App is started at port ${port}`)
}
