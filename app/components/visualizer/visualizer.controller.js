app.controller('VisualizerCtrl', function ($scope, PlayerService, $rootScope, $interval) {
    //$rootScope.$on('songStarted', function () {
    //    //var fft = new FFT.complex(1, true);
    //    //console.log(fft, FFT);
    ////    VisualizerService.freqData = new Array(Math.floor(PlayerService.player.asset.decoder.blockSize / 100));
    ////    VisualizerService.svg = VisualizerService.createSvg('#viz', VisualizerService.svgHeight, VisualizerService.svgWidth);
    ////
    ////    VisualizerService.svg.selectAll('rect')
    ////        .data(VisualizerService.freqData)
    ////        .enter()
    ////        .append('rect')
    ////        .attr('x', function (d, i) {
    ////            return i * (VisualizerService.svgWidth / VisualizerService.freqData.length);
    ////        })
    ////        .attr('width', VisualizerService.svgWidth / VisualizerService.freqData.length - VisualizerService.barPadding);
    ////    console.log(VisualizerService.svg);
    //    var counter = 0;
    //    PlayerService.player.asset.decoder.on('data', function (data) {
    //        if (counter % 10 === 0) {
    //            var result = fft(data);
    //            console.log(result);
    //            var freq = fftUtil.fftFreq(result.slice(0, result.length / 2), 44100);
    //            var magnitudes = fftUtil.fftMag(result.slice(0, result.length / 2));
    //            //var both = freq.map(function (f, ix) {
    //            //    return {frequency: f, magnitude: magnitudes[ix]};
    //            //});
    //            //console.log(both);
    //        }
    //        counter++;
    //    });
    //})
});