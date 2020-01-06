import { ipcRenderer } from 'electron'
// const ipcRenderer = window.electron.ipcRenderer
export default function (url, data = {}) {
  return new Promise(resolve => {
    resolve(ipcRenderer.sendSync(url, data))
  })
}
