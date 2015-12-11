'use strict';
var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('electron').ipcMain;
require('crash-reporter').start();
require('electron-reload')(__dirname);

var mainWindow = null;
var insertWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1000, height: 720});

  mainWindow.loadURL('file://' + __dirname + '/index.html');


  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

function createInsertWindow() {
  insertWindow = new BrowserWindow({
    width: 320,
    height: 240,
    show: false
  });

  insertWindow.loadURL('file://' + __dirname + '/addSongs.html');
  insertWindow.show();
  insertWindow.on('closed',function() {
    insertWindow = null;
  });
}

ipc.on('open-add-songs', function() {
    createInsertWindow();
});

ipc.on('newSongsAdded', function (event, songs) {
  mainWindow.webContents.send('newSongsAdded', songs);
});