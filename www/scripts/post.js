
var request = require("superagent"),
    util = require("./util"),
    math = require("./math");

/**
 * @author Anthony Pizzimenti
 * @desc Gets data for a specific post.
 * @param {function} callback Called when the request to /api/posts/<id> returns.
 * @param {boolean} loggedIn Is there a user logged in?
 * @returns {undefined}
 */
function getPostData(callback, loggedIn) {
    var id = window.location.pathname.split("/")[2];
    request
        .get("/api/posts/" + id)
        .end(function(err, res) {
            callback(JSON.parse(res.text), loggedIn);
        });
}

/**
 * @author Anthony Pizzimenti
 * @desc Populates the page with retrieved post data.
 * @param {object} data Post data.
 * @param {boolean} loggedIn Is there a user logged in?
 * @returns {undefined}
 */
function displayPost(data, loggedIn) {
    var content = document.getElementById("content"),
        title = document.getElementById("title"),
        subtitle = document.getElementById("subtitle"),
        created = document.getElementById("created");

    // set title
    document.title = data.title;

    // fill in all the page info
    content.innerHTML = data.body;
    title.innerText = data.title;
    subtitle.innerText = data.subtitle;
    created.innerText = new Date(data.created).toLocaleDateString();
    math();
}

/**
 * @author Anthony Pizzimenti
 * @desc Displays an (edit) link if there's a user logged in.
 * @param {object} user A google user object.
 * @returns {undefined}
 */
function displayEditIfAuth(user) {
    if (!user) getPostData(displayPost, false);
    else getPostData(displayPost, true);
}

module.exports = function() {
    if (window.location.pathname.split("/").length >= 3 && window.location.pathname.split("/")[1] == "posts") {
        util.onLoad("isPost", function() {
            util.checkAuth(displayEditIfAuth);
        });
    }
};
