'use strict';
app.directive('playPause', ($document, $rootScope) => {
    return {
        restrict: 'A',
        controller: ($scope) => {
            $document.bind('keypress', function (e) {
                e.preventDefault();
                $rootScope.$broadcast('keypress', e.which);
                $rootScope.$broadcast('keypress:' + e.which, e);
            })
        }
    }
})