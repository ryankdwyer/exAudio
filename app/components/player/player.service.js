'use strict';

app.factory('PlayerService', function (Storage, $rootScope, $timeout) {
    var player = {};
    player.asset = '';
    player.playing = false;
    player.shuffle = false;
    player.metadata = '';
    player.playSong = playSong;
    player.getPlayerStatus = getPlayerStatus;
    player.play = play;
    player.pause = pause;
    player.stop = stop;
    player.next = next;
    player.previous = previous;
    player.shufflePlay = shufflePlay;
    player.getMetadata = getMetadata;

    function playSong (song, idx) {
      if (player.asset !== '') {
        player.stop();
      }
      fs.readFile(song.path, function (err, songBuffer) {
        if (err) alert(`That file does not exist. \nPlease pick another song.`);

        player.asset = AV.Player.fromBuffer(songBuffer);
        player.asset.idx = idx;

        player.asset.on('end', function () {
          if (player.shuffle === true) player.shufflePlay();
          else player.next();
        });

        player.asset.on('progress', function (duration) {
          $rootScope.$emit('durationChange', duration);
        });

        player.asset.on('ready', function () {
          player.metadata = player.asset.metadata;
          player.metadata.$loki = song.$loki;
          player.playing = true;
          $rootScope.$emit('songStarted', player.asset);
        });

        $rootScope.$on('keypress', function (event, keyCode) {
          if (player.playing) {
            player.pause();
          } else {
            player.play();
          }
          player.playing = !player.playing;
        });
        player.play();
      });
    };

    function getPlayerStatus() {
        return player.playing;
    };
    
    function play() {
      if (player.asset !== '') {
        player.asset.play();
      }
    };

    function pause() {
      if (player.asset !== '') {
        player.asset.pause();
      }
    };

    function stop() {
      if (player.asset !== '') {
        player.asset.stop();
      }
    };
    
    function next() {
      if (player.shuffle) player.shufflePlay();
      else {
        if (player.asset !== '') {
          var nextSongIdx = player.asset.idx + 1;
          if (nextSongIdx >= Storage.collection.data.length) return false;
          else {
            var nextSong = Storage.orderedSongs[nextSongIdx];
            player.playSong(nextSong, nextSongIdx);
          }
        }
      }
    };
    
    function previous() {
      if (player.asset !== '') {
        var prevSongIdx = player.asset.idx - 1;
        if (prevSongIdx < 0) return false;
        else {
          var nextSong = Storage.orderedSongs[prevSongIdx];
          player.playSong(nextSong, prevSongIdx);
        }
      }
    };

   function shufflePlay() {
     if (player.asset !== '') {
       var max = Storage.collection.data.length - 1;
       var nextSongIdx = Math.floor(Math.random() * (max + 1));
       var nextSong = Storage.orderedSongs[nextSongIdx];
       player.playSong(nextSong, nextSongIdx);
     }
   };

   function getMetadata() {
     if(player.asset !== '') {
       return player.asset.metadata;
     }
   };

   return player;
});
