app.controller('HeaderCtrl', ($scope, PlayerService, Storage, spotifyAPIFactory) => {
  $scope.openAddSongs = () => {
    ipc.send('open-add-songs');
  };

  $scope.spotifyAuth = () => {
    ipc.send('auth-spotify');
  };

  ipc.on('spotify-auth-tokens', function(event, data) {
    Storage.addCreds('spotify', data).then(function(data) {});
  })
});
