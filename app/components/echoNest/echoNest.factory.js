'use strict';
app.factory('spotifyAPIFactory', ($http, Storage) => {
    let factory = {};
    factory.baseUrl = 'https://api.spotify.com/v1/';
    factory.getSimilarArtist = function (songData) {
        let headers = factory.buildSpotifyHeaders();
        let method = 'GET';
        return factory.getSpotifyId('artist', songData)
            .then(function(response) {
                let url = `${factory.baseUrl}recommendations?seed_artists=${response.data.artists.items[0].id}`;
                return factory.request(method, url, {}, headers);
            })
            .then(function(response) {
                return response.data;
            })
    }
    factory.getSpotifyId = function (type, data) {
        let url = `${factory.baseUrl}search?q=${data}&type=${type}`;
        let method = 'GET';
        return factory.request(method, url, {}, {});
    }
    factory.getSpotifyAuth = function () {
        if (Storage.credentials) {
            let credCollection = Storage.db.getCollection('creds');
            let creds = credCollection.find({'service': 'spotify'});
            if (creds) return creds[0];
        }
        return false;
    }
    factory.buildSpotifyHeaders = function() {
        let creds = factory.getSpotifyAuth();
        if (creds) {
            return {'Authorization': `Bearer ${creds.access_token}`};
        }
    }
    factory.request = function(method, url, data, headers) {
        data = data || {};
        headers = headers || {};
        let req = {
            method: method,
            url: url,
            headers: headers,
            data: data
        };
        return $http(req);
    }

    return factory;
});
