app.controller('UploaderCtrl', function ($scope, PlayerService, Storage, $rootScope ) {
    var songInput = $id('song-input');

    songInput.addEventListener("change", fileSelectHandler, false);

    $scope.playSong = function (songPath, idx) {
        PlayerService.playSong(songPath, idx);
    };

    function $id(id) {
        return document.getElementById(id);
    }

    function fileSelectHandler (e) {
        var files = e.target.files || e.dataTransfer.files;
        var songsToAdd = [];
        for (var i = 0; i < files.length;i++) {
            songsToAdd.push(parseFile(files[i]));
        }
        return Promise.all(songsToAdd)
        .then(function(songs) {
            $rootScope.$emit('newSongsAdded');
        })
    }

    function parseFile(file) {
        mm(fs.createReadStream(file.path), function (err, metadata) {
            if (err) throw err;
            metadata.path = file.path;
            Storage.addSongs(metadata);
            $scope.$digest();
        });
    }
})