'use strict';
app.directive('nowplaying', function () {
  return {
    restrict: 'E',
    templateUrl: './app/components/nowPlaying/nowPlaying.html',
    controller: 'NowPlayingCtrl' 
  }
})
