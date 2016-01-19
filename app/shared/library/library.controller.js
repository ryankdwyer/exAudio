app.controller('LibraryCtrl', ($scope, Storage, $rootScope, PlayerService, $timeout) => {
    $scope.sortType = 'artist';
    $scope.sortReverse = false;
    $scope.selectedIndex = -1;

    Storage.init();

    ipc.on('newSongsAdded', function (event, songs) {
        $scope.$apply($scope.songs = $scope.songs.concat(songs));
    });

    $scope.removeSong = (lokiId, $index) => {
        Storage.collection.remove(lokiId);
        Storage.db.saveDatabase();
    };

    $scope.playSong = (song, idx) => {
        PlayerService.playSong(song, idx);
    };

    $scope.selectedSong = (idx) => {
        $scope.selectedIndex = idx;
    };

    $scope.orderChange = () => {
        $timeout(function () {
            var song = Storage.orderedSongs[PlayerService.player.idx];
            Storage.orderedSongs = $scope.orderedSongs;
            PlayerService.player.idx = matchLokiId(song.$loki);
        }, 100);
    };

    $rootScope.$on('dbLoaded', () => {
        $scope.$apply($scope.songs = Storage.collection.data);
        Storage.orderedSongs = $scope.orderedSongs;
    });

    $rootScope.$on('newSongsAdded', (event) => {
        $scope.$apply($scope.songs = Storage.collection.data);
    });

    // Replace with lodash
    var matchLokiId = (lokiId) => {
        //return _.findIndex(Storage.orderedSongs, {$loki: lokiId});
        for (var i = 0; i < Storage.orderedSongs.length; i++) {
            if (lokiId === Storage.orderedSongs[i].$loki) {
                return i;
            }
        }
    }
});