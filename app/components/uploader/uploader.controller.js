app.controller('UploaderCtrl', function ($scope) {
    $scope.files = [];
    var songInput = $id('song-input');

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
            $scope.files.push(metadata);
            $scope.$digest();
        });
    }
})