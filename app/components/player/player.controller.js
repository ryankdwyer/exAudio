app.controller('PlayerCtrl', function ($scope, PlayerService, $rootScope, $timeout) {
  $scope.Player = PlayerService;
  $scope.currentSong = 'test';
  $scope.totalTime = null;
  $scope.duration = 0;
  $scope.seekTime = 0; 
  var progressBar = $id('songDuration');
  var volumeBar = $id('volume');

  function $id(id) {
    return document.getElementById(id);
  }

  $rootScope.$on('songStarted', function (event, playerObj) {
    var song = (playerObj.asset.metadata.artist || playerObj.metadata.albumArtist) + ' - ' + (playerObj.asset.metadata.title || '') + ' - ' + (playerObj.format.formatID.toUpperCase() || '');
    $scope.totalTime = playerObj.duration;
    $scope.currentSong = song;
    $scope.currentLokiId = playerObj.asset.metadata.$loki;
  });

  $rootScope.$on('durationChange', function (event, elapsed) {
    $scope.duration = elapsed;
    progressBar.value = elapsed;
    $scope.$apply();
  });

  $rootScope.$on('keypress', function (event, keyCode) {
    $scope.$apply();
  });

  $scope.changeVolume = function (value) {
    $scope.Player.player.volume = value;
  };

  $scope.toggleShuffle = function () {
    $scope.Player.shuffle = !$scope.Player.shuffle;
  };

  //$scope.seekTo = function () {
  //  $scope.Player.seekTo($scope.seekTime/1000);
  //};
});
