
var util = require("./../util"),
    firebase = require("firebase");

function Post () {
    // initialize db connection
    util.init();
    this.db = firebase.database();
};

Post.prototype.getAll = function(callback) {
    this.db.ref("/posts/").orderByChild("created").once("value", callback);
}

Post.prototype.get = function(id, callback) {
    this.db.ref("/posts/" + id).once("value").then(callback)
}

Post.prototype.save = function (post, callback, errorCallback) {
    this.db.ref("/posts").push().set(post).then(callback).catch(errorCallback);
}

Post.prototype.saveOne = function (id, post, callback, errorCallback) {
    this.db.ref("/posts/" + id).set(post).then(callback).catch(errorCallback);
}

module.exports = Post;
