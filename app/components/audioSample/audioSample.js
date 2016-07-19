app.directive('audioSample', ($sce) => {
    return {
        restrict: 'E',
        templateUrl: './app/components/audioSample/audioSample.html',
        scope: {
            artistInfo: '=artist',
        },
        link: (scope, element, attrs) => {
           scope.$watch('artistInfo', (newVal, oldVal) => {
                if (newVal) {
                    scope.url = $sce.trustAsResourceUrl(newVal.preview_url);
                }
           })
        }
    }
});
