app.controller('HeaderCtrl', function ($scope) {
    $scope.openAddSongs = function () {
        ipc.send('open-add-songs');
    }
});