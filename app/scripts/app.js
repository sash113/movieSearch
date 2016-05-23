'use strict';

/**
 * @ngdoc overview
 * @name moviesApp
 * @description
 * # moviesApp
 *
 * Main module of the application.
 */

angular
  .module('moviesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'infinite-scroll',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/single/:imdb', {
        templateUrl: 'views/single.html',
        controller: 'SingleCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run(function(DataProvider, OMDBDataSource) {

    DataProvider.setDataSource(OMDBDataSource);
  });
