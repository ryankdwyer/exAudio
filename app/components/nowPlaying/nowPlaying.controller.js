'use strict';
app.controller('NowPlayingCtrl', function($scope, $rootScope, PlayerService, spotifyAPIFactory) {
    $rootScope.$on('songStarted', function(event, playerObj) {
        var artist = playerObj.metadata.artist || playerObj.metadata.albumartist;
        console.log('here is the artist: ', playerObj);
        spotifyAPIFactory.getArtist(artist)
          .then(function(artistInfo) {
              console.log('here is the artist info: ', artistInfo);    
              $scope.nowPlaying = artistInfo;
          })
    })                                                             
});
