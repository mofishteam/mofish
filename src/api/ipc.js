import { ipcRenderer } from 'electron'
let requestId = 1
// const ipcRenderer = window.electron.ipcRenderer
export default function (url, data = {}, options = {}) {
  const { sync } = options
  return new Promise(async (resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Request Timeout'))
    }, 60000)
    if (sync) {
      const result = ipcRenderer.sendSync(url, { data })
      console.log(`ipc request -- url(${url}), result(${result})`)
      resolve(result)
    } else {
      requestId++
      console.log(url, { data, requestId })
      ipcRenderer.send(url, { data, requestId })
      ipcRenderer.once(`${url}-reply-${requestId}`, (evt, args) => {
        console.log(`${url}-reply-${requestId}`, args)
        resolve(args)
      })
    }
  })
}
