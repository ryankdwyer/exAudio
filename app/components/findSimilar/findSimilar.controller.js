'use strict';
app.controller('FindSimilarCtrl', function ($scope, echoNestFactory, PlayerService) {
  $scope.getSimilarArtists = () => {
    if (PlayerService.player !== 'test') {
      let songData = PlayerService.getMetadata(PlayerService.player);
      echoNestFactory.getSimilarArtist(songData)
        .then(function (similarArtists) {
          console.log(similarArtists);
          $scope.similar = similarArtists.data.response.artists;
        })
    }
  }
});