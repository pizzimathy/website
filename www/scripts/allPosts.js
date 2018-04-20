
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
 * @param {boolean} loggedIn    Is there a user logged in? Passed straight to <code>callback()</code>.
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
 * @see allPosts.getPostData
 * @param {object} data Contains post data from <code>getPostData()</code>.
 * @param {boolean} loggedIn Is this user logged in?
 * @returns {undefined}
 */
function createPostLinks(data, loggedIn) {
    var stage = document.getElementById("stage"),
        titles = data.titles.reverse(),
        keys = data.keys.reverse(),
        subtitles = data.subtitles.reverse(),
        created = data.times.reverse(),
        published = data.published.reverse(),
        opts = { year: "numeric", month: "long", day: "numeric" },
        i, preview;

    for (i = 0; i < titles.length; i++) {
        preview = document.createElement("div");
        preview.className = "preview";
        preview.style.clear = "both";

        // if there's a subtitle, attach it; otherwise, don't
        if (subtitles[i] !== "") preview.innerHTML = `<a style="font-weight: bold; float: left;" target="blank" href="posts/${keys[i]}">${titles[i]}: ${subtitles[i]}</a>`;
        else preview.innerHTML = `<a style="font-weight: bold; float: left;" target="blank" href="posts/${keys[i]}">${titles[i]}</a>`;

        // if there's a user logged in, display an "edit" link
        if (loggedIn) preview.innerHTML += ` <a style="font-size:12px; float: left;" href="editor/${keys[i]}">(edit)</a>`;

        // attach the date
        preview.innerHTML += `<p style="float: right; margin: 0">${new Date(created[i]).toLocaleDateString("en-EN", opts)}</p>`;

        // if there isn't a user logged in and the post isn't "published", don't display it
        if (!loggedIn && !published[i]) continue;
        
        // attach the preview
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
    util.onLoad("posts", displayEditIfAuth);
};
