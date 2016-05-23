'use strict';

/**
 * Created by sash on 5/22/16.
 */

angular.module('moviesApp')
    /**
     * Store request and response data
     */
    .factory('DataRequest', function () {
        return function () {
            this.id = parseInt(Date.now());
            this.params = [];
            this.data = [];
            this.totalResults = 0;
            this.currentOffset = 0;
            this.step = 1;
            this.page = 1;
            this.busy = false;
            this.done = false;
            this.hasError = false;
        };
    });

