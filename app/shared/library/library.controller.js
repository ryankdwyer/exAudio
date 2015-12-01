app.controller('LibraryCtrl', function ($scope, Storage, $rootScope) {
    Storage.init();

    $rootScope.$on('dbLoaded', function() {
        $scope.$apply($scope.songs = Storage.collection.data);
    });

    $rootScope.$on('newSongsAdded', function (event) {
        $scope.$apply($scope.songs = Storage.collection.data);
    })
});