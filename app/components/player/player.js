app.directive('player', function () {
    return {
        restrict: 'E',
        templateUrl: './app/components/player/player.html',
        controller: 'PlayerCtrl'
    }
})