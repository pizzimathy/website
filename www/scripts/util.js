
var request = require("superagent");

function checkAuth(callback) {
    request
        .get("/api/loggedIn")
        .end(function (err, res) {
            callback(res)
        });
}

function checkPath(path) {
    return "/" + path === window.location.pathname;
}

function onLoad(path, callback, errorCallback) {
    document.addEventListener("DOMContentLoaded", function (e) {
        if (path == "isPost")
            callback();
        else if (checkPath(path))
            callback();
        else if (errorCallback)
            errorCallback();
    });
}

module.exports = {
    checkAuth: checkAuth,
    checkPath: checkPath,
    onLoad: onLoad
}
