'use strict';

app.factory('echoNestFactory', function ($http) {
    return {
        baseUrl: 'http://developer.echonest.com/api/v4/',
        apiKey: '8YDC6AKKEKAWA7FLS',
        getSimilarArtist: function (songData) {
            let call = `${this.baseUrl}artist/similar?api_key=${this.apiKey}&name=${songData.artist}&bucket=images&bucket=urls`;
            return $http.get(call, response => response.data);
        }
    }
});