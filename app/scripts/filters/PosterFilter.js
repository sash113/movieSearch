'use strict';

/**
 * Created by sash on 5/23/16.
 */

angular.module('moviesApp')
    .filter('poster', function() {
        return function(input) {
            if(input ===undefined || input == "N/A" || !input.length){
                return 'images/noimage.svg';
            }else{
                return input;
            }
        };
});