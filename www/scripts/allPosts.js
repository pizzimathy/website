
/**
 * @namespace allPosts
 */

var request = require("superagent"),
    util = require("./util"),
    math = require("./math");

/**
 * @author Anthony Pizzimenti
 * @desc Retrieves all posts.
 * @memberof allPosts
 * @param {function} callback   Called when the request for post data returns. Takes two parameters.
 * @param {boolean} loggedIn    Is there a user logged in? Passed straight to callback().
 * @returns {undefined}
 */
function getPostData(callback, loggedIn) {
    request
        .get("/api/posts/")
        .end(function(err, res) {
            callback(JSON.parse(res.text), loggedIn);
        });
}

/**
 * @author Anthony Pizzimenti
 * @desc Creates the list of post links on the /posts/ page.
 * @memberof allPosts
 * @param {object} data Contains post data from getPostData().
 * @param {boolean} loggedIn Is this user logged in?
 * @returns {undefined}
 */
function createPostLinks(data, loggedIn) {
    var stage = document.getElementById("stage"),
        titles = data.titles.reverse(),
        keys = data.keys.reverse(),
        i, preview;

    for (i = 0; i < titles.length; i++) {
        preview = document.createElement("div");
        preview.className = "preview";
        preview.innerHTML = "<a style=\"font-weight: bold\" target=\"blank\" href=\"/posts/" + keys[i] + "\">" + titles[i] + "</a>";

        if (loggedIn)
            preview.innerHTML += " <a style=\"font-size:12px\" href=\"/editor/" + keys[i] + "\">(edit)</a>";

        stage.appendChild(preview);
        math();
    }
}

/**
 * @author Anthony Pizzimenti
 * @desc Displays an (edit) link if there's a user logged in.
 * @memberof allPosts
 * @param {object} user A Firebase User object.
 * @returns {undefined}
 */
function displayEditIfAuth(user) {
    if (!user)
        getPostData(createPostLinks, false);
    else
        getPostData(createPostLinks, true);
}

module.exports = function() {
    util.onLoad("posts", function() {
        util.checkAuth(displayEditIfAuth);
    });
};
