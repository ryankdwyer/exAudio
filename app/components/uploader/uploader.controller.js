app.controller('UploaderCtrl', function ($scope, LibraryService, PlayerService ) {
    var songInput = $id('song-input');

    songInput.addEventListener("change", FileSelectHandler, false);

    $scope.playSong = function (songPath, idx) {
        PlayerService.playSong(songPath, idx);
    };

    function $id(id) {
        return document.getElementById(id);
    }

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