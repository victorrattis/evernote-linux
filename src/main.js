'use strict'

const electron = require('electron')
const { app, BrowserWindow } = electron

let mainWindow

app.on('ready', () => {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    'min-width': 650,
    'min-height': 400,
    frame: true
  })

  mainWindow.loadURL(`file://${__dirname}/app/ui/index.html`)

  mainWindow.on('closed', function () {
    mainWindow = null
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    app.emit('ready')
  }
})
