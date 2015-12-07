app.controller('VisualizerCtrl', function ($scope, PlayerService, $rootScope, $interval, VisualizerService) {
    //$rootScope.$on('songStarted', function () {
    //    VisualizerService.freqData = new Array(Math.floor(PlayerService.player.asset.decoder.blockSize / 100));
    //    VisualizerService.svg = VisualizerService.createSvg('#viz', VisualizerService.svgHeight, VisualizerService.svgWidth);
    //
    //    VisualizerService.svg.selectAll('rect')
    //        .data(VisualizerService.freqData)
    //        .enter()
    //        .append('rect')
    //        .attr('x', function (d, i) {
    //            return i * (VisualizerService.svgWidth / VisualizerService.freqData.length);
    //        })
    //        .attr('width', VisualizerService.svgWidth / VisualizerService.freqData.length - VisualizerService.barPadding);
    //    console.log(VisualizerService.svg);
    //    PlayerService.player.asset.decoder.on('data', function (data) {
    //        VisualizerService.renderChart(data, VisualizerService.svg);
    //    });
    //})
});