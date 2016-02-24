'use strict';
var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require('electron').ipcMain;
var crashReporter = require('electron').crashReporter

crashReporter.start({
  productName: 'MyAppName',
  companyName: 'MyCompanyName',
  submitURL: 'http://localhost:3000/',
  autoSubmit: true
});

crashReporter.getLastCrashReport();

//require('electron-reload')(__dirname);

var mainWindow = null;
var uploaderWindow = null;
var findSimilarWindow = null;

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

function openFindSimilar ()  {
  findSimilarWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false
  });

  findSimilarWindow.loadURL(`file://${__dirname}/findSimilar.html`);
  findSimilarWindow.show();

  findSimilarWindow.on('closed', function () {
    findSimilarWindow = null;
  });
}

ipc.on('open-add-songs', function() {
    openUploader();
});

ipc.on('find-similar', function(event, songMetadata) {
  openFindSimilar();
  ipc.on('sendSongMetadata', function (event) {
    findSimilarWindow.webContents.send('songMetadata', songMetadata);
  });
  findSimilarWindow.on('focus', function () {
    findSimilarWindow.webContents.send('songMetadata', songMetadata)
  })
});

ipc.on('newSongsAdded', function (event, songs) {
  mainWindow.webContents.send('newSongsAdded', songs);
});