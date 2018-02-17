/**
 * @ngDoc Directive
 * @name app.Directive.onKeyEnter
 * @module app
 *
 * @description 
 * this directive triggers callback function when enter key is pressed
 * 
 * @author Mohan Singh <mslogicmaster@gmail.com>
 * 
 */
// angular
//    .module('app', []);
//    
angular
    .module('app')
    .directive('onKeyEnter', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('keydown keypress', function(event) {
                    if (event.which === 13) {
                        var attrValue = $parse(attrs.onKeyEnter);
                        (typeof attrValue === 'function') ? attrValue(scope) : angular.noop();
                        event.preventDefault();
                    }
                });
                scope.$on('$destroy', function() {
                    element.unbind('keydown keypress');
                });
            }
        };
}]);