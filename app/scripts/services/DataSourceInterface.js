'use strict';

/**
 * Created by sash on 5/22/16.
 */
angular.module('moviesApp')
    .factory('DataSourceInterface', function () {
        return function () {

            var defaultMethodConfiguration = {
                value: function (request) {
                    console.log('This method need be implemented');
                },
                configurable: true,
                writable: false,
                enumerable: false
            };

            function implementRealization(name, func){
                if(func){
                    defaultMethodConfiguration.value = func;
                }
                Object.defineProperty(this, name, defaultMethodConfiguration);
            }

            this.implementRealization = implementRealization;

            this.implementRealization('config');
            this.implementRealization('prepareRequest');
            this.implementRealization('request');

            this.totalResults = null;
            this.page = null;
        };
    });