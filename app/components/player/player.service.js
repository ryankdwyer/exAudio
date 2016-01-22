app.factory('PlayerService', function(Storage, $rootScope){
    // refactor as an ES6 Class
    return {
        player: 'test',
        playing: false,
        playSong: function (song, idx) {
            var self = this;
            if (self.player !== 'test') {
                self.player.stop();
            }
            fs.readFile(song.path, function(err, songBuffer) {
                self.player = AV.Player.fromBuffer(songBuffer);
                self.player.idx = idx;
                self.player.on('end', function () {
                    var nextSongIdx = Storage.orderedSongs.indexOf(song) + 1;
                    if (nextSongIdx >= Storage.collection.data.length) return false;
                    else {
                        var nextSong = Storage.orderedSongs[nextSongIdx];
                        self.playSong(nextSong, nextSongIdx);
                    }
                });
                self.player.on('progress', function (duration) {
                    $rootScope.$emit('durationChange', duration);
                });
                self.player.on('ready', function () {
                    self.updateDuration(song,self.player);
                    $rootScope.$emit('songStarted', self.player);
                    self.playing = true;
                });
                $rootScope.$on('keypress' , function (event, keyCode) {
                    if (keyCode === 32) {
                        self.player.togglePlayback();
                    }
                });
                self.player.play();
            });
        },
        getPlayerStatus: (player) => player.playing,
        play: (player) => {
            if(player !== 'test') {
                player.play();
            }
        },
        pause: (player) => {
            if(player !== 'test') {
                player.pause();
            }
        },
        stop: (player) => {
            if(player !== 'test') {
                player.stop();
            }
        },
        next: (player) => {
            if(player.player !== 'test') {
                var nextSongIdx = player.player.idx + 1;
                if (nextSongIdx >= Storage.collection.data.length) return false;
                else {
                    var nextSong = Storage.orderedSongs[nextSongIdx];
                    player.playSong(nextSong, nextSongIdx);
                }
            }
        },
        previous: (player) => {
            if(player.player !== 'test') {
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
        }
    }
});