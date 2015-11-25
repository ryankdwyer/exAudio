app.controller('UploaderCtrl', function ($scope, LibraryService, PlayerService ) {
    var songInput = $id('song-input');

    $scope.playSong = function (songPath) {
        // need to check if something is already playing
        PlayerService.playSong(songPath);
    };

    function $id(id) {
        return document.getElementById(id);
    }

    songInput.addEventListener("change", FileSelectHandler, false);

    function FileSelectHandler (e) {
        var files = e.target.files || e.dataTransfer.files;
        for (var i = 0; i < files.length;i++) {
            ParseFile(files[i]);
        }
    }

    function ParseFile(file) {
        mm(fs.createReadStream(file.path), function (err, metadata) {
            if (err) throw err;
            metadata.path = file.path;
            LibraryService.songs.push(metadata);
            $scope.$digest();
        });
    }
})