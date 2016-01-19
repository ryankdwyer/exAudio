app.directive('uploader', () => {
    return {
        restrict: 'E',
        templateUrl: './app/components/uploader/uploader.html',
        controller: 'UploaderCtrl'
    }
});