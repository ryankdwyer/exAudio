app.factory('PlayerService', function () {
    return {
        player: 'test',
        playSong: function (songPath) {
            var self = this;
            if (self.player !== 'test') {
                self.player.stop();
            }
            fs.readFile(songPath, function(err, songBuffer) {
                self.player = AV.Player.fromBuffer(songBuffer);
                self.player.play();
                self.playing = true;
            })
        },
        playing: false
    }
});