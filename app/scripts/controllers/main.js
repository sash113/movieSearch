'use strict';

/**
 * @ngdoc function
 * @name moviesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the moviesApp
 */
angular.module('moviesApp')
  .controller('MainCtrl', function ($scope, DataProvider, Paginator) {

    $scope.titleInput="";
    $scope.yearInput="";
    $scope.typeInput="";

    $scope.types = ['movies', 'series', 'episode'];
    $scope.paginator = Paginator;
    $scope.paginator.requestData = DataProvider.setRequestData('movies');

    $scope.search = function () {

        $scope.paginator.id = 'movies';
        $scope.paginator.reset();

        var params = {
            title: $scope.titleInput
        };
        if($scope.yearInput.length){
            console.log('Year is valid');
            params.year = $scope.yearInput;
        }
        if($scope.typeInput){
            params.type = $scope.typeInput;
        }

        DataProvider.prepareRequest('movies', params);
        $scope.paginator.nextPage();
    };
  });
