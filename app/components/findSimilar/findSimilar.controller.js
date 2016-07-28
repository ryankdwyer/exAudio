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
        .then(function (similarSongs) {
            similarSongs = sortSongs(similarSongs.tracks, 'popularity');
          similarSongs.map(function(track) {
            track.links = buildExternalLinks(track.artists[0].name, track.artists[0].id);
          });
          $scope.similar = similarSongs;
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

  let sortSongs = (songs, parameter) => {
    return _.sortBy(songs, parameter);
  }

  $rootScope.$on('songStarted', function(event, player) {
    $scope.getSimilarArtists();
  })
  $scope.spotifyAuth = () => {
      ipc.send('auth-spotify');
  };

  let validateSpotifyCreds = function () {
    if (spotifyAPIFactory.checkAuthCreds()) {
        $scope.authorized = true;
    } else {
        $scope.authorized = false;
    }
  }
  validateSpotifyCreds();
});
