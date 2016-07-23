'use strict';
app.controller('FindSimilarCtrl', function ($scope, $rootScope, spotifyAPIFactory, PlayerService) {
  $scope.getSimilarArtists = () => {
    if (PlayerService.player !== 'test') {
      if (!spotifyAPIFactory.checkAuthCreds()) {
          $scope.authorized = false;
        return false;
      }
      let songData = PlayerService.getMetadata(PlayerService.player);
      spotifyAPIFactory.getSimilarArtist(songData)
        .then(function (similarArtists) {
          similarArtists.tracks.map(function(track) {
            track.links = buildExternalLinks(track.artists[0].name, track.artists[0].id);
          });
          $scope.similar = similarArtists.tracks;
        })
    }
  };

  let buildExternalLinks = (artistName, spotifyId) => {
    let query = artistName.split(' ').join('+');
    let what = `https://what.cd/torrents.php?searchstr=${query}`;
    let youTube = `https://www.youtube.com/results?search_query=${query}`;
    let spotify = `https://open.spotify.com/artist/${spotifyId}`;
    return {
      what: what,
      youTube: youTube,
      spotify: spotify
    }
  }

  $rootScope.$on('songStarted', function(event, player) {
    $scope.getSimilarArtists();
  })
  $scope.spotifyAuth = () => {
      ipc.send('auth-spotify');
  };

  var validateSpotifyCreds = function () {
    if (spotifyAPIFactory.checkAuthCreds()) {
        $scope.authorized = true;
    } else {
        $scope.authorized = false;
    }
  }
  validateSpotifyCreds();
});
