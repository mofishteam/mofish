const { app, BrowserWindow } = require('electron')

function createWindow () {
  // 创建浏览器窗口
  let win = new BrowserWindow({
    width: 1000,
    height: 600,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 加载index.html文件
  if (global.vuePort) {
    win.loadURL(`http://localhost:${global.vuePort}`)
  } else {
    win.loadFile('index.html')
  }
}

app.on('ready', createWindow)
