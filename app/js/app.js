var batmanPlannerApp = angular.module('batman', ['ngRoute','ngResource','ngCookies']);

batmanPlannerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html'
      }).
      when('/search', {
        templateUrl: 'partials/search.html',
        controller: 'SearchCtrl'
      }).
      // when('/dish/:dishId', {
      //   templateUrl: 'partials/character.html',
      //   controller: 'CharacterCtrl'
      // }).

      // // TODO in Lab 5: add more conditions for the last two screens (overview and preparation)
      // when('/overview',{
      //   templateUrl: 'partials/overview.html',
      //   controller: 'batmanCtrl'
      // }).
      // when('/preparation',{
      //   templateUrl: 'partials/preparation.html',
      //   controller: 'batmanCtrl'
      // }).
      otherwise({
        redirectTo: '/home'
      });
  }]);