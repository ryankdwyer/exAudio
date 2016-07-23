'use strict';
const electron = require('electron');
const app = require('app');
const BrowserWindow = require('browser-window');
const parse = require('url-parse');

var methods = {};

methods.options = {
    client_id: '6aabb157cf8f4ae6930b3f616c016a36',
    response_type: 'token',
    redirect_uri: 'https://localhost/callback',
}

methods.initAuth = function (mainWindow) {
    var authWindow = new BrowserWindow({
        width: 800, 
        height: 600, 
        show: false, 
        'node-integration': false,
        'web-security': false
    });
    var spotifyUrl = 'https://accounts.spotify.com/authorize?';
    var authUrl = spotifyUrl + 'client_id=' + methods.options.client_id + 
        '&redirect_uri=' + methods.options.redirect_uri + 
        '&response_type=' + methods.options.response_type;
    
    authWindow.loadURL(authUrl);
    authWindow.show();
    
    authWindow.webContents.on('will-navigate', function (event, newUrl) {
        var hashResult = methods.parseHashFragment(parse(newUrl).hash);
        mainWindow.webContents.send('spotify-auth-tokens', hashResult);
        setTimeout(function () {authWindow.close()}, 1500);
    });

    authWindow.on('closed', function() {
          authWindow = null;
    });
}

methods.parseHashFragment = function (hash) {
    if (!hash) return false;

    var result = {};

    if (hash[0] === '#') {
        hash = hash.slice(1);
    }

    hash.split('&').forEach(function(hashPair) {
        var vals = hashPair.split('=');
        result[vals[0]] = vals[1];
    });
    return result; 
};

module.exports = methods;
