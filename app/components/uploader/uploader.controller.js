app.controller('UploaderCtrl', function ($scope, Storage, $rootScope ) {
    var songInput = $id('song-input');
    var fileDrag = $id('file-drag');
    Storage.init();
    songInput.addEventListener("change", fileSelectHandler, false);
    filedrag.addEventListener("dragover", fileDragHover, false);
    filedrag.addEventListener("dragleave", fileDragHover, false);
    filedrag.addEventListener("drop", fileSelectHandler, false);
    filedrag.style.display = "block";

    function $id(id) {
        return document.getElementById(id);
    }

    function fileDragHover(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.className = (e.type == "dragover" ? "hover" : "");
    }

    function fileSelectHandler (e) {
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
                    console.log('uploader', songs);
                ipc.send('newSongsAdded', songs);
                ipc.send('open-add-songs');
            });
        })
    }

    function parseFile(file) {
        return new Promise(function(resolve, reject) {
            mm(fs.createReadStream(file.path), function (err, metadata) {
                if (err) reject(err);
                metadata.path = file.path;
                resolve(createMetadataObject(metadata));
            });
        })
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