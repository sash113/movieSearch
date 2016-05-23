'use strict';

/**
 * Created by sash on 5/22/16.
 */
angular.module('moviesApp')
    .service('OMDBDataSource', function ($q, $http, $sce, DataSourceInterface) {

        var API_HOST = 'http://www.omdbapi.com/';
        var httpGetConfig = {
            headers:  {
                'Accept': 'application/json;'
            }
        };

        DataSourceInterface.call(this);

        this.implementRealization('config', function (params) {
           if(params.hasOwnProperty('API_URL')){
               API_HOST = params['API_HOST'];
           }
        });

        this.implementRealization('request', function (requestData) {

            function paramBuilder(key, param) {
                return key + '=' + param + '&';
            }

            var deferred = $q.defer();
            var apiUrl = API_HOST + '?';

            var params = requestData.params;

            // Validation and assign variables
            if(params.hasOwnProperty('page') && params['page'] > 0){
                apiUrl += paramBuilder('page', params['page']);
            }

            if(params.hasOwnProperty('imdb')){
                apiUrl += paramBuilder('i', params['imdb']);
            }else if(params.hasOwnProperty('title')){
                apiUrl += paramBuilder('s', params['title']);
            }

            if(params.hasOwnProperty('year')){
                apiUrl += paramBuilder('y', params['year']);
            }

            if(params.hasOwnProperty('type')){
                apiUrl += paramBuilder('type', params['type']);
            }
            // else{
            //     apiUrl += paramBuilder('type', 'movie');
            // }

            $http
                .get(apiUrl, httpGetConfig)
                .success(function(response) {

                    if(!response || response.length == 0){
                        deferred.reject("Server return empty response");
                    }

                    if(!response['Response'] || response['Response'] !== 'True'){
                        deferred.reject(
                            "Server return error response: '"
                            + $sce.trustAsHtml(response['Error'])
                            +  "'"
                        );
                    }

                    if(response.hasOwnProperty('Search')){
                        requestData.data = response['Search'];
                        requestData.totalResults = response['totalResults'];
                    }else{
                        requestData.data = response;
                    }

                    deferred.resolve(requestData);
                }).error(function(err) {
                    deferred.reject('Can not get data from server. ' + err);
                });

            return deferred.promise;
        });
    });
