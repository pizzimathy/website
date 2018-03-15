
var firebase = require("firebase"),
    util = require("./../util");

function Auth () {
    this.auth = firebase.auth();
}

Auth.prototype.login = function(email, password, error, callback) {
    this.auth.signInWithEmailAndPassword(email, password).catch(error).then(callback);
}

Auth.prototype.isLoggedIn = function(callback) {
    this.auth.onAuthStateChanged(callback);
}

module.exports = Auth;
