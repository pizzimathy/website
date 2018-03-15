
var request = require("superagent");

function checkAuth() {
    superagent
        .get("/api/loggedIn")
        .end(function (err, res) {
            return res;
        });
}

function checkPath(path) {
    return "/" + path === window.location.pathname;
}

function onLoad(path, callback, errorCallback) {
    document.addEventListener("DOMContentLoaded", function (e) {
        if (checkPath(path))
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
