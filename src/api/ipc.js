import { ipcRenderer } from 'electron'
// const ipcRenderer = window.electron.ipcRenderer
console.log(ipcRenderer)
export default function (url, data = {}) {
  return new Promise(resolve => {
    console.log(url, data, ipcRenderer.sendSync, ipcRenderer.send)
    resolve(ipcRenderer.send(url, data))
  })
}
