app.directive('uploader', function () {
    return {
        restrict: 'E',
        templateUrl: './app/components/uploader/uploader.html',
        controller: 'UploaderCtrl'
    }
});