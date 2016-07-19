app.directive('audioSample', ($sce) => {
    return {
        restrict: 'E',
        templateUrl: './app/components/audioSample/audioSample.html',
        scope: {
            artistInfo: '=artist',
        },
        link: (scope, element, attrs) => {
           scope.playing = false;
           scope.$watch('artistInfo', (newVal, oldVal) => {
                if (newVal) {
                    scope.url = $sce.trustAsResourceUrl(newVal.preview_url);
                }
           })
           scope.playSongPreview = (url) => {
               var audioElement = document.getElementById(url);
               console.log(audioElement);
               if (audioElement.paused) {
                    audioElement.play();
                    scope.playing = true;
               } else {
                   audioElement.pause();
                   scope.playing = false;
               }
           }
        }
    }
});
