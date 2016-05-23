'use strict';

/**
 * Created by sash on 5/22/16.
 */
var console = {};
/**
 * Overriding console.log
 * @todo implement advanced realization for production
 * @param log
 */
console.log = function(log){
    console.log(log);
};
window.console = console;