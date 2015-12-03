app.controller('LibraryCtrl', function ($scope, Storage, $rootScope, PlayerService) {
    $scope.sortType = null;
    $scope.sortReverse = false;
    $scope.selectedIndex = -1;

    ipc.on('newSongsAdded', function (err) {
        Storage.collection = Storage.db.getCollection('songs');
        $scope.$apply($scope.songs = Storage.collection.data);
    });

    $scope.removeSong = function(lokiId) {
        Storage.collection.remove(lokiId);
        Storage.db.saveDatabase();
    };

    $scope.playSong = function (songPath, idx) {
        PlayerService.playSong(songPath, idx);
    };

    $scope.selectedSong = function (idx) {
        $scope.selectedIndex = idx;
    };

    Storage.init();

    $rootScope.$on('dbLoaded', function() {
        $scope.$apply($scope.songs = Storage.collection.data);
    });

    $rootScope.$on('newSongsAdded', function (event) {
        $scope.$apply($scope.songs = Storage.collection.data);
    });
});