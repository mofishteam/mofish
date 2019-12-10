// import { ipcRenderer } from 'electron'
// const ipcRenderer = window.electron.ipcRenderer
console.log(require('fs'), window.require('fs'))
setTimeout(() => {
  console.log(require('fs'))
}, 1000)
const { ipcRenderer } = require('electron')

export default function (url, data) {
  return new Promise(resolve => {
    resolve(ipcRenderer.sendSync(url, data))
  })
  // return new Promise({})
}
