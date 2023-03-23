const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 900,
      height: 700
    })
  
    win.loadFile('create.html')
  }

  app.whenReady().then(() => {
    createWindow()
  })

  