
var request = require("superagent");

function checkPath(path) {
    return "/" + path === window.location.pathname;
}

function onLoad(path, callback, errorCallback) {
    document.addEventListener("DOMContentLoaded", function (e) {
        if (path == "isPost" || path == "isEditor") {
            callback();
        } else if (checkPath(path)) {
            callback();
        } else if (errorCallback) {
            errorCallback();
        }
    });
}

function storeUser(user) {
    sessionStorage.setItem("user", user);
}

function checkAuth(callback) {
    var user = sessionStorage.getItem("user");

    if (user) {
        callback(user);
        createLogoutButton();
    } else
        callback(false);
}

function createLogoutButton() {
    var login = document.getElementById("login");
    login.href="javascript:;";
    login.innerText = "Log Out";

    login.addEventListener("click", function () {
        logout(function (res) {
            if (res) {
                sessionStorage.removeItem("user");
                window.location.reload();
            } else
                window.alert("Couldn't be logged out.");
        });
    });
}

function logout(callback) {
    request
        .get("/api/logout/")
        .end(function (err, res) {
            callback(res);
        });
}
module.exports = {
    checkAuth: checkAuth,
    checkPath: checkPath,
    onLoad: onLoad,
    storeUser: storeUser,
    createLogoutButton: createLogoutButton
}
