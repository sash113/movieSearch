'use strict';

/**
 * Created by sash on 5/23/16.
 */

/**
 * @ngdoc function
 * @name moviesApp.controller:SingleCtrl
 * @description
 * # SingleCtrl
 * Controller of the moviesApp
 */
angular.module('moviesApp')
    .controller('SingleCtrl', function ($scope, $routeParams, DataProvider, localStorageService) {

        function setData(data) {
            $scope.title = data.Title;
            $scope.year = data.Year;
            $scope.poster = data.Poster;
        }

        $scope.imdb=$routeParams.imdb;

        if (localStorageService.getStorageType().indexOf('session') >= 0) {
            $scope.storageType = 'Session storage';
        }
        if (!localStorageService.isSupported) {
            $scope.storageType = 'Cookie';
        }
        $scope.storageType = 'Local storage';


        var data = localStorageService.get('moviesApp_imdb' + $routeParams.imdb);

        if(data){
            setData(data);
            return;
        }

        DataProvider.setRequestData('movies');
        DataProvider.prepareRequest('movies', {
            imdb: $scope.imdb
        });

        DataProvider.request('movies').then(
            function (reqestData) {
                localStorageService.set('moviesApp_imdb' + $routeParams.imdb, reqestData.data);
                setData(reqestData.data);
            },
            function (err) {
                $scope.err = err;
            }
        );
    });