import electron from 'electron'
const fs = electron.remote.require('fs')
// const path = electron.remote.require('path')
const os = electron.remote.require('os')
const homedir = os.homedir()

export default function (filePath, type) {
  filePath = filePath.replace(/^~/, homedir)
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, result) => {
      if (err) {
        reject(err)
      } else {
        switch (type) {
          case 'string': resolve(result.toString()); break
          case 'json': resolve(JSON.parse(result.toString() || '{}')); break
          default: resolve(result)
        }
      }
    })
  })
}
