

angular.module('app', ['ngRoute', 'ngResource', 'testView', 'data'])

.config(function($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;

    $routeProvider
		.when('/test', {
			templateUrl: 'views/test.html',
			controller: 'TestViewCtrl'
		})
        .otherwise({
            redirectTo: '/test'
        });
    }
);
