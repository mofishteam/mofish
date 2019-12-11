import { ipcRenderer } from 'electron'
// const ipcRenderer = window.electron.ipcRenderer
console.log(require('fs'), window.require('fs'))
setTimeout(() => {
  console.log(require('fs'))
}, 1000)
// const { ipcRenderer } = require('electron')
console.log(ipcRenderer)
export default function (url, data = {}) {
  return new Promise(resolve => {
    console.log(url, data, ipcRenderer.sendSync)
    resolve(ipcRenderer.send(url, data))
  })
}
