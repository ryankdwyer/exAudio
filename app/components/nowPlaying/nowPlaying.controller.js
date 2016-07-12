'use strict';
app.controller('NowPlayingCtrl', function($scope, $rootScope, PlayerService, $timeout) {
  $scope.$watch(function () {return PlayerService.metadata}, function (newVal) {
    $scope.nowPlaying = newVal;
  })
});
