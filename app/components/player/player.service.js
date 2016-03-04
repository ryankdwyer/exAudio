app.factory('PlayerService', function (Storage, $rootScope) {
  // convert to service to remove event emission
  return {
    player: 'test',
    playing: false,
    shuffle: false,
    shuffleOrder: [],
    playSong: function (song, idx) {
      var self = this;
      if (self.player !== 'test') {
        self.player.stop();
      }
      fs.readFile(song.path, function (err, songBuffer) {
        if (err) alert(`That file does not exist. \nPlease pick another song.`);
        self.player = AV.Player.fromBuffer(songBuffer);
        self.player.idx = idx;
        self.player.on('end', function () {
          if (self.shuffle === true) self.shufflePlay(self);
          else self.next(self);
        });
        self.player.on('progress', function (duration) {
          $rootScope.$emit('durationChange', duration);
        });
        self.player.on('ready', function () {
          self.updateDuration(song, self.player);
          $rootScope.$emit('songStarted', self.player);
          self.playing = true;
        });
        $rootScope.$on('keypress', function (event, keyCode) {
          if (self.playing) {
            self.pause(self.player);
          } else {
            self.play(self.player);
          }
          self.playing = !self.playing;
        });
        self.player.play();
      });
    },
    getPlayerStatus: (player) => player.playing,
    play: (player) => {
      if (player !== 'test') {
        player.play();
      }
    },
    pause: (player) => {
      if (player !== 'test') {
        player.pause();
      }
    },
    stop: (player) => {
      if (player !== 'test') {
        player.stop();
      }
    },
    next: (player) => {
      if (player.shuffle) player.shufflePlay(player);
      else {
        if (player.player !== 'test') {
          var nextSongIdx = player.player.idx + 1;
          if (nextSongIdx >= Storage.collection.data.length) return false;
          else {
            var nextSong = Storage.orderedSongs[nextSongIdx];
            player.playSong(nextSong, nextSongIdx);
          }
        }
      }
    },
    previous: (player) => {
      if (player.player !== 'test') {
        var prevSongIdx = player.player.idx - 1;
        if (prevSongIdx < 0) return false;
        else {
          var nextSong = Storage.orderedSongs[prevSongIdx];
          player.playSong(nextSong, prevSongIdx);
        }
      }
    },
    updateDuration: (song, player) => {
      if (song.duration !== 0) return false;
      song.duration = player.duration / 1000;
      Storage.collection.update(song);
      Storage.db.saveDatabase();
    },
    shufflePlay: (player) => {
      if (player.player !== 'test') {
        var max = Storage.collection.data.length - 1;
        var nextSongIdx = Math.floor(Math.random() * (max + 1));
        var nextSong = Storage.orderedSongs[nextSongIdx];
        player.playSong(nextSong, nextSongIdx);
      }
    },
    getMetadata: (player) => {
      if(player.player !== 'test') {
        return player.metadata;
      }
    }
  }


});