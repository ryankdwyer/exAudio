app.controller('UploaderCtrl', ($scope, Storage) => {
    var songInput = $id('song-input');
    var fileDrag = $id('file-drag');
    $scope.loading = false;

    Storage.init();

    songInput.addEventListener("change", fileSelectHandler, false);
    filedrag.addEventListener("dragover", fileDragHover, false);
    filedrag.addEventListener("dragleave", fileDragHover, false);
    filedrag.addEventListener("drop", fileSelectHandler, false);

    function $id(id) {
        return document.getElementById(id);
    }

    function fileDragHover(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.className = (e.type == "dragover" ? "hover" : "");
    }

    function fileSelectHandler (e) {
        $scope.loading = true;
        fileDragHover(e);
        var files = e.target.files || e.dataTransfer.files;
        var songsToAdd = [];
        var dateStart = Date.now();
        for (var i = 0; i < files.length;i++) {
            songsToAdd.push(parseFile(files[i]));
        }
        Promise.all(songsToAdd)
        .then(function(songs) {
            Storage.addSongs(songs)
            .then(function(collection) {
                ipc.send('newSongsAdded', songs);
                $scope.loading = false;
            });
        })
    }

    function parseFile(file) {
        var songData = {};
        var songStream = fs.createReadStream(file.path);
        var metaPromise = new Promise(function(resolve, reject) {
            mm(songStream, function (err, metadata) {
                if (err) reject(err);
                metadata.path = file.path;
                resolve(createMetadataObject(metadata));
            });
        })
        return metaPromise.then(function(metaObject) {
            songData = metaObject;
            if (songData.duration) {
                return songData;
            } else {
                return ID3.parse(file);
            }
        }).then(function(metaObject) {
            if (songData.duration) {
                return songData;
            }
            songData.duration = metaObject.length / 1000;        
            return songData;
        });
    }

    function createMetadataObject (songData) {
        return {
            album: songData.album,
            artist: songData.artist,
            title: songData.title,
            duration: songData.duration,
            path: songData.path,
            track: songData.track,
            year: songData.year
        }
    }
});
