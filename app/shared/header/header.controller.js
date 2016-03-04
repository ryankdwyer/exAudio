app.controller('HeaderCtrl', ($scope, PlayerService, Storage, echoNestFactory) => {
  $scope.openAddSongs = () => {
    ipc.send('open-add-songs');
  };
  $scope.findSimilarSongs = () => {
    var metadata = PlayerService.getMetadata(PlayerService.player);
    echoNestFactory.getSimilarArtist(metadata)
      .then(function(data) {
        console.log(data);
      })
  }
});