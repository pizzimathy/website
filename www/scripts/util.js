
/**
 * @namespace util
 */
var request = require("superagent");

/**
 * @author Anthony Pizzimenti
 * @desc Checks the value of the current window location with the desired path.
 * @memberof util
 * @param {string} path Desired path.
 * @returns {boolean} Is the provided path the same as the current window location?
 */
function checkPath(path) {
    return "/" + path === window.location.pathname;
}

/**
 * @author Anthony Pizzimenti
 * @desc When the page at /<path> loads, call the callback.
 * @memberof util
 * @param {string} path Desired path.
 * @param {function} callback Called when all DOM content has loaded.
 * @param {function} errorCallback Called if there is an error loading content or the path is incorrect.
 * @returns {undefined}
 */
function onLoad(path, callback, errorCallback) {
    document.addEventListener("DOMContentLoaded", function(e) {
        if (path == "isPost" || path == "isEditor") callback();
        else if (checkPath(path)) callback();
        else if (errorCallback) errorCallback();
    });
}

/**
 * @author Anthony Pizzimenti
 * @desc Stores the user object in session storage to retain login.
 * @memberof util
 * @param {object} user A google user object.
 * @returns {undefined}
 */
function storeUser(user) {
    sessionStorage.setItem("user", user);
}

/**
 * @author Anthony Pizzimenti
 * @desc Checks if there's a user logged in (for the current session).
 * @memberof util
 * @param {function} callback Called if there's a user logged in.
 * @return {undefined}
 */
function checkAuth(callback) {
    var user = sessionStorage.getItem("user");

    if (user) {
        callback(user);
        createLogoutButton();
    } else callback(false);
}

/**
 * @author Anthony Pizzimenti
 * @desc Replaces the "Log In" link with a "Log Out" link if there's a user logged in.
 * @memberof util
 * @returns {undefined}
 */
function createLogoutButton() {
    var login = document.getElementById("login");
    login.href="javascript:;";
    login.innerText = "Log Out";

    login.addEventListener("click", function() {
        logout(function(res) {
            if (res) {
                sessionStorage.removeItem("user");
                window.location.reload();
            } else window.alert("Couldn't be logged out.");
        });
    });
}

/**
 * @author Anthony Pizzimenti
 * @desc Logs out a user.
 * @memberof util
 * @param {function} callback Called when the request to /api/logout returns.
 * @returns {undefined}
 */
function logout(callback) {
    request
        .get("/api/logout/")
        .end(function(err, res) {
            callback(res);
        });
}

module.exports = {
    checkAuth: checkAuth,
    checkPath: checkPath,
    onLoad: onLoad,
    storeUser: storeUser,
    createLogoutButton: createLogoutButton
};
