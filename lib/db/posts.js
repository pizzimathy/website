
var util = require("./../util"),
    firebase = require("firebase");

function Post () {
    // initialize db connection
    util.init();
    this.db = firebase.database();
};

Post.prototype.getAll = function(callback) {
    this.db.ref("posts/").orderByChild("created").once("value", callback);
}

Post.prototype.get = function(id, callback) {
    this.db.ref("posts/" + id).once("value").then(callback)
}

Post.prototype.save = function (post) {
    this.db.ref.push().set(post);
}

module.exports = Post;
