app.controller('LibraryCtrl', function ($scope, Storage, $rootScope, PlayerService) {
    $scope.sortType = 'artist';
    $scope.sortReverse = false;
    $scope.selectedIndex = -1;

    Storage.init();

    ipc.on('newSongsAdded', function (songs) {
        $scope.$apply($scope.songs = $scope.songs.concat(songs));
    });

    $scope.removeSong = function(lokiId) {
        Storage.collection.remove(lokiId);
        Storage.db.saveDatabase();
    };

    $scope.playSong = function (song, idx) {
        PlayerService.playSong(song, idx);
    };

    $scope.selectedSong = function (idx) {
        $scope.selectedIndex = idx;
    };

    $rootScope.$on('dbLoaded', function() {
        $scope.$apply($scope.songs = Storage.collection.data);
    });

    $rootScope.$on('newSongsAdded', function (event) {
        $scope.$apply($scope.songs = Storage.collection.data);
    });

});