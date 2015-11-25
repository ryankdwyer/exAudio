app.directive('header', function () {
    return {
        restrict: "E",
        templateUrl: './app/shared/header/header.html',
        controller: 'HeaderCtrl'
    }
});