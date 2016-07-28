app.directive('audioSample', ($sce, PlayerService) => {
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
               PlayerService.pause(PlayerService.player);
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
