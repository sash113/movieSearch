/**
 * Created by sash on 5/22/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name moviesApp.controller:MainCtrl
 * @description
 * DataProvider
 */

angular.module('moviesApp')
    .service('DataProvider', function (DataRequest) {
        var _dataSource = null;
        var requests = [];
        var dp = {

            /**
             * Set or create request
             * @param id - unique id of request
             * @param Object [requestData]
             */
            setRequestData: function(id, requestData){
                var request = new DataRequest();
                if(requestData){
                    angular.extend(request, requestData);
                }

                requests[id] = request;
                return requests[id];
            },

            /**
             * Get request by ID
             * @param id
             * @returns {*}
             */
            getRequestData: function (id) {
                if(requests.hasOwnProperty(id)){
                    return requests[id];
                }else{
                    return null;
                }
            },

            prepareRequest: function (id, params) {
                requests[id].params = angular.extend(requests[id].params, params);
                if(params.hasOwnProperty('page'))
                {
                    requests[id].page = params['page'];
                }
                return requests[id].params;
            },

            /**
             * Do request
             * @param id
             * @returns promise
             */
            request: function (id) {
                if(!requests.hasOwnProperty(id)){
                    throw new Error('Request data with specified ID not found');
                }
                var response = _dataSource.request(requests[id]);
                return response;
            },

            /**
             * Config base settings like API-key, etc
             * @param params
             */
            config: function (params) {
                _dataSource.config(params);
            },

            /**
             * Set DataSource
             * @param ds
             */
            setDataSource: function (ds) {
                _dataSource = ds;
            }
        };
        Object.defineProperty(dp, 'dataSource', {
            get: function() {
                return _dataSource;
            }
        });

        return dp;
    });