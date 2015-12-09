app.controller('LibraryCtrl', function ($scope, Storage, $rootScope, PlayerService, $timeout) {
    $scope.sortType = 'artist';
    $scope.sortReverse = false;
    $scope.selectedIndex = -1;

    Storage.init();

    ipc.on('newSongsAdded', function (songs) {
        $scope.$apply($scope.songs = $scope.songs.concat(songs));
    });

    $scope.removeSong = function(lokiId, $index) {
        Storage.collection.remove(lokiId);
        Storage.db.saveDatabase();
    };

    $scope.playSong = function (song, idx) {
        PlayerService.playSong(song, idx);
    };

    $scope.selectedSong = function (idx) {
        $scope.selectedIndex = idx;
    };

    $scope.orderChange = function () {
        $timeout(function () {
            var song = Storage.orderedSongs[PlayerService.player.idx];
            Storage.orderedSongs = $scope.orderedSongs;
            PlayerService.player.idx = matchLokiId(song.$loki);
        }, 100);
    };

    $rootScope.$on('dbLoaded', function() {
        $scope.$apply($scope.songs = Storage.collection.data);
        Storage.orderedSongs = $scope.orderedSongs;
    });

    $rootScope.$on('newSongsAdded', function (event) {
        $scope.$apply($scope.songs = Storage.collection.data);
    });

    // Replace with lodash
    var matchLokiId = function (lokiId) {
        for (var i = 0; i < Storage.orderedSongs.length; i++) {
            if (lokiId === Storage.orderedSongs[i].$loki) {
                return i;
            }
        }
    }
});