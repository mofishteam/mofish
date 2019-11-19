const { app, BrowserWindow } = require('electron')
const path = require('path')
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
})

function createWindow () {
  // 创建浏览器窗口
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 加载index.html文件
  win.loadFile('dist/index.html')
  win.webContents.openDevTools()
}

app.on('ready', createWindow)
