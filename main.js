'use strict';
var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var ipc = require('ipc');
require('crash-reporter').start();

var mainWindow = null;
var insertWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1000, height: 720});

  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

function createInsertWindow() {
  insertWindow = new BrowserWindow({
    width: 640,
    height: 480,
    show: false
  });

  insertWindow.loadUrl('file://' + __dirname + '/addSongs.html');

  insertWindow.on('closed',function() {
    insertWindow = null;
  });
}

ipc.on('open-add-songs', function() {
  if(!insertWindow) {
    createInsertWindow();
  }
  return (!insertWindow.isClosed() && insertWindow.isVisible()) ? insertWindow.hide() : insertWindow.show();
});

ipc.on('newSongsAdded', function () {
  mainWindow.webContents.send('newSongsAdded');
});