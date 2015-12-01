app.controller('PlayerCtrl', function ($scope, PlayerService, $rootScope) {
    $scope.Player = PlayerService;
    $scope.currentSong = 'test';
    $scope.totalTime = null;
    $scope.duration = null;

    $rootScope.$on('songStarted', function (event, playerObj) {
    	var song = playerObj.asset.metadata.artist + ' - ' + playerObj.asset.metadata.title;
        $scope.totalTime = playerObj.duration;
    	$scope.currentSong = song;
    });

    $rootScope.$on('durationChange', function (event, elapsed) {
    	$scope.$apply($scope.duration = elapsed);
    });
});