import { ipcMain } from 'electron'

export default class IpcRouter {
  constructor () {
    this.prefixUrl = ''
    // this.ipcName = ''
    this.handler = {}
  }
  prefix (url) {
    this.prefixUrl = url
  }
  async set (url, handler) {
    this.handler[this.prefixUrl + url] = handler || (() => {})
  }
  register () {
    // console.log('register, ', this.ipcName)
    for (const name in this.handler) {
      console.log(name)
      ipcMain.on(name, async (e, args) => {
        console.log(args)
        const { requestId, data } = args
        const result = await this.handler[name](data)
        if (requestId) {
          e.reply(`${name}-reply-${requestId}`, result)
        }
        e.returnValue = result
      })
    }
  }
}
