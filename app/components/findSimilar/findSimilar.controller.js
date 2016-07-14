'use strict';
app.controller('FindSimilarCtrl', function ($scope, echoNestFactory, PlayerService) {
  $scope.getSimilarArtists = () => {
    if (PlayerService.player !== 'test') {
      let songData = PlayerService.getMetadata(PlayerService.player);
      echoNestFactory.getSimilarArtist(songData)
        .then(function (similarArtists) {
          console.log(similarArtists.data.response);
          similarArtists.data.response.artists.map(function(artist) {
            artist.links = buildExternalLinks(artist.name, artist.foreign_ids[0].foreign_id);
          });
          $scope.similar = similarArtists.data.response.artists;
        })
    }
  };

  let buildExternalLinks = (artistName, spotifyArtistId) => {
    let query = artistName.split(' ').join('+');
    let spotifyId = spotifyArtistId.split(':')[2];
    let what = `https://what.cd/torrents.php?searchstr=${query}`;
    let youTube = `https://www.youtube.com/results?search_query=${query}`;
    let spotify = `https://open.spotify.com/artist/${spotifyId}`;
    return {
      what: what,
      youTube: youTube,
      spotify: spotify
    }
  }
});
