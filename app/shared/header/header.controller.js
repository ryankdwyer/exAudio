app.controller('HeaderCtrl', ($scope, PlayerService, Storage, echoNestFactory) => {
  $scope.openAddSongs = () => {
    ipc.send('open-add-songs');
  };
});