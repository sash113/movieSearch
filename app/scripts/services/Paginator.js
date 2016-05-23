'use strict';

/**
 * Created by sash on 5/23/16.
 */

angular.module('moviesApp')
    .factory('Paginator', function (DataProvider) {
        var DEFAULT_STEP = 1;

        var paginator = {
            id: null,
            data: [],
            requestData: null,

            nextPage: function () {
                if ((paginator.requestData === null)
                    || paginator.requestData.busy
                    || paginator.requestData.done
                    || (paginator.id===null)){

                    return;
                }

                paginator.requestData.busy = true;

                DataProvider.request(paginator.id).then(
                    function (requestData) {
                        paginator.data = paginator.data.concat(requestData.data);
                        requestData.currentOffset = paginator.data.length;

                        if(requestData.totalResults > requestData.currentOffset){
                            paginator.requestData.page += 1;
                            DataProvider.prepareRequest(paginator.id, {page: paginator.requestData.page});
                        }else{
                            paginator.requestData.done = true;
                        }
                        paginator.requestData.busy = false;
                    },
                    function (err) {
                        paginator.requestData.busy = false;
                        paginator.requestData.done = true;
                        paginator.requestData.hasError = true;
                    }
                );
            },
            reset: function () {
                var resetObject = {
                    page: 1,
                    params: {},
                    totalResults: 0,
                    busy: false,
                    done: false,
                    hasError: false
                };

                paginator.requestData = DataProvider.setRequestData(paginator.id, resetObject);
                paginator.data = paginator.data.splice(0, paginator.data);
            }
        };

        return paginator;
    });