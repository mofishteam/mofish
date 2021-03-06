import { getValidPort, portIsOccupied } from './portInUsed'
import { addStaticServer, deleteStaticServer } from './frontendStatic'
import urlParse from 'url-parse'
import eventBus from '../utils/eventBus'
import { response, check } from '../utils/response'
import Koa from 'koa'
import KoaStatic from 'koa-static'
import KoaRouter from 'koa-router'
import { getPluginConfig, setPluginConfig } from '../utils/configs'
import lsof from 'lsof'
const pluginModules = {}

export default async function (settings) {
  const pluginInfo = {}
  let currentPlugin = null
  try {
    for (const plugin of settings.plugins) {
      currentPlugin = plugin
      await loadPlugin(pluginInfo, plugin)
    }
    global.pluginInfo = pluginInfo
  } catch (err) {
    console.log(`Plugin "${(currentPlugin || '').name}" crashed when mofish parse it's config, please check and restart mofish. Error: \n ${err} \n ======================`)
  }
}

export const loadPlugin = async (pluginInfo, plugin) => {
  pluginInfo[plugin.name] = require(plugin.path).default(global.commander.dev)
  console.log('loadPlugin name: ', plugin.name, 'frontend: ', pluginInfo[plugin.name].frontend)
  pluginInfo[plugin.name].isDev = global.commander.dev
  pluginInfo[plugin.name].pluginName = plugin.name
  if (!global.commander.dev) {
    const port = await getValidPort(8080)
    pluginInfo[plugin.name].port = port
    await addStaticServer(pluginInfo[plugin.name])
    pluginInfo[plugin.name].frontend = `http://localhost:${port}`
  }
  await initPlugin(pluginInfo[plugin.name], plugin)
  return pluginInfo[plugin.name]
}

export const unloadPlugin = async (pluginName) => {
  await deleteStaticServer(pluginName)
  await destroyPlugin(pluginName)
}

export const initPlugin = async (pluginInfo, plugin) => {
  const MofishPlugin = pluginInfo.main
  pluginModules[plugin.name] = new MofishPlugin({
    name: plugin.name,
    libs: {
      Koa,
      KoaStatic,
      KoaRouter
    },
    utils: {
      lsof,
      response,
      check,
      urlParse,
      // getPluginConfig函数返回一个函数，和setPluginConfig不同
      getConfig: getPluginConfig(plugin.name),
      setConfig: setPluginConfig,
      portIsOccupied,
      getValidPort
    },
    eventBus,
    plugins: global.pluginInfo,
    pluginObjects: pluginModules
  })
}

export const destroyPlugin = async (pluginName) => {
  pluginModules[pluginName].destroy && pluginModules[pluginName].destroy()
}

export const getPluginModule = (pluginName) => {
  return pluginModules[pluginName]
}
