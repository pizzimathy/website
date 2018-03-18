
var firebase = require("firebase"),
    util = require("./../util");

function Auth () {
    this.auth = firebase.auth();
}

Auth.prototype.login = function(email, password, callback, errorCallback) {
    this.auth.signInWithEmailAndPassword(email, password).then(callback).catch(errorCallback);
}

Auth.prototype.signOut = function (callback) {
    this.auth.signOut().then(
        function (_) {
            callback(true);
        }).catch(function (err) {
            callback(false);
        }
    );
}

module.exports = Auth;
