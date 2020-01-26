import Router from '../utils/ipcRouter'
import libnpmsearch from 'libnpmsearch'
// import { response } from '../utils/response'
import { getLocalPackages } from '../utils/getPackages'
// import urlParse from 'url-parse'
// import eventBus from '../utils/eventBus'
const router = new Router()

router.prefix('/package')

router.set('/online', async (arg) => {
  // if (!check(query, [['name', 'string']])) {
  //   response(ctx, 400, null, {
  //     message: 'Param error, check it and retry.'
  //   })
  //   await next()
  //   return
  // }
  console.log(arg)
  const { name } = arg
  return libnpmsearch(name)
})

router.set('/local', async (ctx, next) => {
  console.log('/local handler')
  return getLocalPackages()
})

export default router
