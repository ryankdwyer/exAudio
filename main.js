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


  mainWindow.on('closed', function() {
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

ipc.on('newSongsAdded', function (event, songs) {
  mainWindow.webContents.send('newSongsAdded', songs);
});