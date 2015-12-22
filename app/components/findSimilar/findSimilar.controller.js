app.controller('FindSimilarCtrl', function ($scope, echoNestFactory) {
    ipc.on('songMetadata', function (event, songMetadata) {
        $scope.song = songMetadata;
        $scope.$apply();
    });

    $scope.getSimilarArtists = function (songData) {
        echoNestFactory.getSimilarArtist(songData)
        .then(function(similarArtists) {
            $scope.similar = similarArtists.data.response.artists;
            console.log($scope.similar);
        })
    }
});