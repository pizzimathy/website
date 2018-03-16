
var firebase = require("firebase"),
    util = require("./../util");

function Auth () {
    this.auth = firebase.auth();
}

Auth.prototype.login = function(email, password, callback, errorCallback) {
    this.auth.signInWithEmailAndPassword(email, password).then(callback).catch(errorCallback);
}

Auth.prototype.isLoggedIn = function(callback) {
    this.auth.onAuthStateChanged(callback);
}

module.exports = Auth;
