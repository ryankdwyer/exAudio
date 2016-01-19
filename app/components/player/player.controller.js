app.controller('PlayerCtrl', function ($scope, PlayerService, $rootScope, $timeout) {
    $scope.Player = PlayerService;
    $scope.currentSong = 'test';
    $scope.totalTime = null;
    $scope.duration = 0;
    var progressBar = $id('songDuration');
    var volumeBar = $id('volume');

    function $id(id) {
        return document.getElementById(id);
    }

    $rootScope.$on('songStarted', function (event, playerObj) {
    	var song = (playerObj.asset.metadata.artist || playerObj.metadata.albumArtist) + ' - ' + (playerObj.asset.metadata.title || '');
        $scope.totalTime = playerObj.duration;
    	$scope.currentSong = song;
    });

    $rootScope.$on('durationChange', function (event, elapsed) {
    	$scope.duration = elapsed;
        progressBar.value = elapsed;
        $scope.$apply();
    });

    $scope.changeVolume = function (value) {
        $scope.Player.player.volume = value;
    };
});