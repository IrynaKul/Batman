
var batmanPlannerApp = angular.module('Batman', ['ngRoute','ngResource','firebase']);

batmanPlannerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/homepage.html'
      }).
      when('/search', {
        templateUrl: 'partials/browse_villain.html',
        controller: 'SearchCtrl'
      }).
      when('/info/:characterId', {
        templateUrl: 'partials/villain_info.html',
        controller: 'infoCtrl'
      }).
      when('/fight', {
        templateUrl: 'partials/vs.html',
        controller: 'GameCtrl'
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
