app.controller('HeaderCtrl', function ($scope, PlayerService) {
    $scope.openAddSongs = function () {
        ipc.send('open-add-songs');
    };

    $scope.openFindSimilar = function () {
        ipc.send('find-similar', PlayerService.player.metadata);
    };
});