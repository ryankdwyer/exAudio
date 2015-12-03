app.controller('UploaderCtrl', function ($scope, Storage, $rootScope ) {
    var songInput = $id('song-input');
    Storage.init();
    songInput.addEventListener("change", fileSelectHandler, false);

    function $id(id) {
        return document.getElementById(id);
    }

    function fileSelectHandler (e) {
        var files = e.target.files || e.dataTransfer.files;
        var songsToAdd = [];
        var dateStart = Date.now();
        for (var i = 0; i < files.length;i++) {
            songsToAdd.push(parseFile(files[i]));
        }
        Promise.all(songsToAdd)
        .then(function(songs) {
            Storage.addSongs(songs)
            .then(function() {
                ipc.send('newSongsAdded');
                ipc.send('open-add-songs');
            });
        })
    }

    function parseFile(file) {
        return new Promise(function(resolve, reject) {
            mm(fs.createReadStream(file.path), function (err, metadata) {
                if (err) reject(err);
                metadata.path = file.path;
                resolve(metadata);
            });
        })
    }
});