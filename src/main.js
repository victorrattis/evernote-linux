'use strict';

const electron = require('electron');
const app = require('app');
const BrowserWindow = require('browser-window');

var mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    const atomScreen = require('screen');
    var size = atomScreen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({
        width: size.width,
        height: size.height,
        frame: true
    });

    mainWindow.loadURL('file://' + __dirname + '/ui/index.html');

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});