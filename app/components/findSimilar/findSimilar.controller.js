app.controller('FindSimilarCtrl', function ($scope, PlayerService) {
    ipc.on('player', function (player) {
        $scope.player = PlayerService.player;
    })
});