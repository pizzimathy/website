
/**
 * @namespace home
 */

var util = require("./util");


/**
 * @author Anthony Pizzimenti
 * @desc Attempts to protect my page from analytics tracking.
 * @memberof home
 * @returns {undefined}
 */
/*
function doNotTrack() {
    var r = /\/*www.google-analytics.com\/analytics.js/g,
        iframe = document.getElementsByTagName("iframe")[0],
        scripts;

    iframe.onload = function() { };
}
*/

module.exports = function() {
    util.onLoad("");
};
