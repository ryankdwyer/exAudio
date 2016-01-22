app.controller('HeaderCtrl', ($scope, PlayerService, Storage) => {
    $scope.openAddSongs = () => {
        ipc.send('open-add-songs');
    };
    $scope.openFindSimilar =  () => {
        ipc.send('find-similar', PlayerService.player);
    };
});