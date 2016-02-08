app.directive('setClassAtTop', ($window, $document) => {
    var $win = angular.element($window);
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var topClass = "fixed top-0 left-0 right-0",
                hideElementClass = 'hide-element',
                offsetTop = 69;
            var header = angular.element(document.querySelector('#libraryHeader'));
            var spacer = angular.element(document.querySelector('#spacer'));
            $win.on('scroll', function (e) {
                if ($win[0].pageYOffset >= offsetTop) {
                    console.log('condition satisfied');
                    spacer.removeClass(hideElementClass);
                    element.removeClass('clearfix');
                    element.addClass(topClass);
                } else {
                    element.removeClass(topClass);
                    element.addClass('clearfix');
                    spacer.addClass(hideElementClass);
                }
            });
        }
    };
})