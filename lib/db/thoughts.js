
var firebase = require("firebase");

/**
 * @author Anthony Pizzimenti
 * @desc Thoughts interface.
 * @memberof lib
 * @class
 * @property {firebase.database.Database} db Initialized firebase database instance.
 */
function Thought() {
    this.db = firebase.database();
}

/**
 * @author Anthony Pizzimenti
 * @desc Saves a thought.
 * @lends Post
 * @param {object} thought Thought object.
 * @param {function} callback Called when the thought is saved.
 * @param {function=} errorCallback Not required, but useful for getting errors.
 * @returns {undefined}
 */
Thought.prototype.save = function(thought, callback, errorCallback) {
    this.db.ref("/thoughts/").push().set(thought).then(callback).catch(errorCallback);
};

/**
 * @author Anthony Pizzimenti
 * @desc Gets the last 10 thoughts.
 * @lends Post
 * @param {function} callback Called when the last 10 things are returned.
 * @param {function=} errorCallback Not required, but useful for getting errors.
 * @returns {undefined}
 */
Thought.prototype.last = function(callback, errorCallback) {
    this.db.ref("/thoughts/").orderByChild("created").limitToFirst(10).once("value", callback);
};

/**
 * @author Anthony Pizzimenti
 * @desc Deletes a thought.
 * @lends Post
 * @param {string} id Unique id of the thought to be deleted.
 * @param {function} callback Called when the thing is deleted.
 * @param {function=} errorCallback Again, not required, but useful.
 * @returns {undefined}
 */
Thought.prototype.delete = function(id, callback, errorCallback) {
    this.db.ref("/thoughts/" + id).remove().then(callback).catch(errorCallback);
};

module.exports = Thought;