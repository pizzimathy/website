
var firebase = require("firebase");

/**
 * @author Anthony Pizzimenti
 * @desc Post api object.
 * @memberof lib
 * @class
 * @property {firebase.database.Database} db An initialized Firebase database service.
 */
function Post() {
    // initialize db connection
    this.db = firebase.database();
}

/**
 * @author Anthony Pizzimenti
 * @desc Gets all posts.
 * @lends Post
 * @param {function} callback Called when posts are returned from the db.
 * @returns {undefined}
 */
Post.prototype.getAll = function(callback) {
    this.db.ref("/posts/").orderByChild("created").once("value", callback);
};

/**
 * @author Anthony Pizzimenti
 * @desc Gets a specific post.
 * @lends Post
 * @param {string} id A post's unique id.
 * @param {function} callback Called when the specified post is returned from the db.
 * @returns {undefined}
 */
Post.prototype.get = function(id, callback) {
    this.db.ref("/posts/" + id).once("value").then(callback);
};

/**
 * @author Anthony Pizzimenti
 * @desc Attempts to save a new post.
 * @lends Post
 * @param {object} post An object containing post data.
 * @param {function} callback Called when the post is successfully saved in the db.
 * @param {function=} errorCallback Called if there's an error.
 * @returns {undefined}
 */
Post.prototype.save = function(post, callback, errorCallback) {
    this.db.ref("/posts").push().set(post).then(callback).catch(errorCallback);
};

/**
 * @author Anthony Pizzimenti
 * @desc Attempts to save an existing post.
 * @lends Post
 * @param {string} id A post's unique id.
 * @param {object} post An object containing post data.
 * @param {function} callback Called when the post is successfully saved in the db.
 * @param {function=} errorCallback Called if there's an error.
 * @returns {undefined}
 */
Post.prototype.saveOne = function(id, post, callback, errorCallback) {
    this.db.ref("/posts/" + id).set(post).then(callback).catch(errorCallback);
};

module.exports = Post;
