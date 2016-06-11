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
        var params = {
            title: $scope.titleInput
        };
        if($scope.yearInput){
            if($scope.yearInput.length){
                params.year = $scope.yearInput;
            }
        }else{

            return false;
        }
        if($scope.typeInput){
            params.type = $scope.typeInput;
        }

        $scope.paginator.id = 'movies';
        $scope.paginator.reset();

        DataProvider.prepareRequest('movies', params);
        $scope.paginator.nextPage();
    };
  });
