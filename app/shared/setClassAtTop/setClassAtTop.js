app.directive('setClassAtTop', ($window, $document) => {
    var $win = angular.element($window);
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var topClass = "fixed top-0 block",
                offsetTop = 68;
            var header = angular.element(document.querySelector('#libraryHeader'));
            $win.on('scroll', function (e) {
                if ($win[0].pageYOffset >= offsetTop) {
                    console.log('condition satisfied');
                    element.removeClass('clearfix');
                    element.addClass(topClass);
                } else {
                    element.removeClass(topClass);
                    element.addClass('clearfix');
                }
            });
        }
    };
})