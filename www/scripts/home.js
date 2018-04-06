
var util = require("./util");

function doNotTrack() {
    var r = /\/*www.google-analytics.com\/analytics.js/g,
        iframe = document.getElementsByTagName("iframe")[0],
        scripts;

    iframe.onload = function() {
        scripts = document.getElementsByTagName("script");
    }
}

module.exports = function () {
    util.onLoad("", doNotTrack);
}
