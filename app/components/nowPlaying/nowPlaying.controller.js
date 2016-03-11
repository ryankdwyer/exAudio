'use strict';
app.controller('NowPlayingCtrl', function($scope, $rootScope, PlayerService, $timeout) { 
  $scope.nowPlaying = 'test';
  $scope.$on('songStarted', function(event, player) {
      $scope.nowPlaying = PlayerService.getMetadata(player); 
      console.log($scope.currentSong);
  });
})
