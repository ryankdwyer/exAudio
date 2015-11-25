app.controller('LibraryCtrl', function ($scope, LibraryService) {
    $scope.songs = LibraryService.songs;
});