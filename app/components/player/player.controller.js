app.controller('PlayerCtrl', function ($scope, PlayerService, $rootScope) {
    $scope.Player = PlayerService;

    $rootScope.$on('songStarted', function (event, playerObj) {
    	console.log(playerObj);
    });
});