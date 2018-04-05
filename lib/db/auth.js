
var firebase = require("firebase");

/**
 * @author Anthony Pizzimenti
 * @desc Auth api object.
 * @memberof lib
 * @class
 * @property {firebase.auth.Auth} auth An initialized Firebase authentication service interface.
 */
function Auth() {
    this.auth = firebase.auth();
}

/**
 * @author Anthony Pizzimenti
 * @lends Auth
 * @desc Attempts to log a user in.
 * @param {string} email A user's email.
 * @param {string} password A user's password.
 * @param {function} callback Called if there are no errors.
 * @param {function} errorCallback Called if there are errors.
 * @returns {undefined}
 */
Auth.prototype.login = function(email, password, callback, errorCallback) {
    this.auth.signInWithEmailAndPassword(email, password).then(callback).catch(errorCallback);
};

/**
 * @author Anthony Pizzimenti
 * @desc Attempts to sign a user out.
 * @lends Auth
 * @param {function} callback Called when the request to Firebase's signOut endpoint returns.
 * @returns {undefined}
 */
Auth.prototype.signOut = function(callback) {
    this.auth.signOut().then(
        function(_) {
            callback(true);
        })
        .catch(function(err) {
            callback(false);
        });
};

module.exports = Auth;
