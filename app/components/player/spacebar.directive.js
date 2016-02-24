'use strict';
// convert this to globalShortcut
app.directive('playPause', ($document, $rootScope) => {
    return {
        restrict: 'A',
        controller: ($scope) => {
            $document.bind('keypress', function (e) {
                if (e.which === 32) {
                    e.preventDefault();
                    $rootScope.$broadcast('keypress', e.which);
                    $rootScope.$broadcast('keypress:' + e.which, e);
                }
            })
        }
    }
})