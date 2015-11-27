app.factory('PlayerService', function () {
    return {
        player: 'test',
        playing: false,
        playSong: function (songPath) {
            var self = this;
            if (self.player !== 'test') {
                self.player.stop();
            }
            fs.readFile(songPath, function(err, songBuffer) {
                self.player = AV.Player.fromBuffer(songBuffer);
                self.player.play();
                self.playing = true;
                console.log(self.getPlayerStatus(self.player));
            })
        },
        getPlayerStatus: function (player) {
            return player.playing;
        },
        play: function (player) {
            if(player !== 'test') {
                player.play();
                console.log(this.getPlayerStatus(player));
            }
        },
        pause: function (player) {
            if(player !== 'test') {
                player.pause();
                console.log(this.getPlayerStatus(player));
            }
        },
        stop: function (player) {
            if(player !== 'test') {
                player.stop();
            }
        }
    }
});