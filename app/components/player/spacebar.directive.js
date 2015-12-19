'use strict';
app.directive('playPause', function ($document, $rootScope) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            $document.bind('keypress', function (e) {
                e.preventDefault();
                $rootScope.$broadcast('keypress', e.which);
                $rootScope.$broadcast('keypress:' + e.which, e);
            })
        }
    }
})