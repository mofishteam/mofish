import { ipcMain } from 'electron'

export default class IpcRouter {
  constructor () {
    this.prefixUrl = ''
    this.ipcName = ''
    this.handler = () => {}
  }
  prefix (url) {
    this.prefixUrl = url
  }
  async set (url, handler) {
    this.ipcName = this.prefixUrl + url
    this.handler = handler
  }
  register () {
    ipcMain.on(this.ipcName, async (e, args) => {
      console.log(args)
      e.returnValue = this.handler(args)
    })
  }
}
