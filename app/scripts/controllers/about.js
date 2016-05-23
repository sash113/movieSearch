'use strict';

/**
 * @ngdoc function
 * @name moviesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the moviesApp
 */
angular.module('moviesApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
