app.directive('library', function() {
    return {
        restrict: 'E',
        templateUrl: './app/shared/library/library.html',
        controller: 'LibraryCtrl'
    }
})