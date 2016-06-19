'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = require('browser-window');

let mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

let newWindow = () => {
  const atomScreen = require('screen');
  const size = atomScreen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: size.width,
    height: size.height,
    'min-width': 650,
    'min-height': 400,
    frame: true
  });

  mainWindow.loadURL(`file://${__dirname}/ui/index.html`);

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
};

// OSX only callback - takes care of spawning
// a new app window if needed
app.on('activate', function () {
  if (mainWindow === null) {
    newWindow();
  }
});

app.on('ready', function () {
  newWindow();
});
