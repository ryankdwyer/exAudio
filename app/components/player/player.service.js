app.factory('PlayerService', function (LibraryService) {
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
                    if (nextSongIdx >= LibraryService.songs.length) return false;
                    else {
                        var nextSong = LibraryService.songs[nextSongIdx];
                        console.log(nextSong, nextSongIdx);
                        self.playSong(nextSong.path, nextSongIdx);
                    }
                });
                self.player.play();
                self.playing = true;
            })
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
        autoPlay: function () {

        }
    }
});