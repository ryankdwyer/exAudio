'use strict';
app.controller('NowPlayingCtrl', function($scope, $rootScope, PlayerService, spotifyAPIFactory) {
    $rootScope.$on('songStarted', function(event, playerObj) {
        var artist = playerObj.metadata.artist || playerObj.metadata.albumartist;
        spotifyAPIFactory.getArtist(artist)
          .then(function(artistInfo) {
              $scope.nowPlaying = artistInfo;
          })
    })                                                             
});
