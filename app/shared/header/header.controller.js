app.controller('HeaderCtrl', ($scope, PlayerService, Storage, echoNestFactory) => {
  $scope.openAddSongs = () => {
    ipc.send('open-add-songs');
  };

  $scope.spotifyAuth = () => {
    console.log('running auth spotify');
    ipc.send('auth-spotify');
  };

  ipc.on('spotify-auth-tokens', function(event, data) {
    console.log('received tokens: ', data);
    Storage.addCreds('spotify', data).then(function(data) {
        console.log('success!: ', data);
    });
  })
});
