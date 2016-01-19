app.directive('player', () => {
    return {
        restrict: 'E',
        templateUrl: './app/components/player/player.html',
        controller: 'PlayerCtrl'
    }
})