app.directive('header', () => {
    return {
        restrict: "E",
        templateUrl: './app/shared/header/header.html',
        controller: 'HeaderCtrl'
    }
});