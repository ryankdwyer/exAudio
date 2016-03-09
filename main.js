'use strict';
const electron = require('electron');
const app = require('app');
const BrowserWindow = require('browser-window');
const ipc = electron.ipcMain;
const crashReporter = electron.crashReporter;
const shell = require('shell');

crashReporter.start({
  productName: 'exAudo',
  companyName: '',
  submitURL: 'http://localhost:3000/',
  autoSubmit: true
});

crashReporter.getLastCrashReport();

//require('electron-reload')(__dirname);

let mainWindow = null;
let uploaderWindow = null;
let findSimilarWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1000, height: 720});

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    shell.openExternal(url);
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

function openUploader() {
  uploaderWindow = new BrowserWindow({
    width: 320,
    height: 240,
    show: false
  });

  uploaderWindow.loadURL('file://' + __dirname + '/addSongs.html');
  uploaderWindow.show();
  uploaderWindow.on('closed',function() {
    uploaderWindow = null;
  });
}

ipc.on('open-add-songs', function() {
    openUploader();
});

ipc.on('newSongsAdded', function (event, songs) {
  mainWindow.webContents.send('newSongsAdded', songs);
});
