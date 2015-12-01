app.factory('PlayerService', function (Storage, $rootScope) {
    return {
        player: 'test',
        playing: false,
        playSong: function (songPath, idx) {
            var self = this;
            if (self.player !== 'test') {
                self.player.stop();
            }
            fs.readFile(songPath, function(err, songBuffer) {
                self.player = AV.Player.fromBuffer(songBuffer);
                self.player.idx = idx;
                self.player.on('end', function () {
                    var nextSongIdx = self.player.idx + 1;
                    if (nextSongIdx >= Storage.collection.data.length) return false;
                    else {
                        var nextSong = Storage.collection.data[nextSongIdx];
                        self.playSong(nextSong.path, nextSongIdx);
                    }
                });
                self.player.on('progress', function (duration) {
                    $rootScope.$emit('durationChange', duration);
                });
                self.player.on('ready', function () {
                    $rootScope.$emit('songStarted', self.player);
                    self.playing = true;
                });
                self.player.play();
            });
        },
        getPlayerStatus: function (player) {
            return player.playing;
        },
        play: function (player) {
            if(player !== 'test') {
                player.play();
            }
        },
        pause: function (player) {
            if(player !== 'test') {
                player.pause();
            }
        },
        stop: function (player) {
            if(player !== 'test') {
                player.stop();
            }
        },
        next: function (player) {
            console.log(player);
            console.log(Storage.collection.data);
            if(player !== 'test') {
                var nextSongIdx = player.idx + 1;
                if (nextSongIdx >= Storage.collection.data.length) return false;
                else {
                    var nextSong = Storage.collection.data[nextSongIdx];
                    this.playSong(nextSong.path, nextSongIdx);
                }
            }
        },
        previous: function (player) {
            if(player !== 'test') {
                var prevSongIdx = player.idx - 1;
                if (prevSongIdx < 0) return false;
                else {
                    var nextSong = Storage.collection.data[prevSongIdx];
                    this.playSong(nextSong.path, prevSongIdx);
                }
            }
        }
    }
});