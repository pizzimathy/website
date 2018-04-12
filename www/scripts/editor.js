
/**
 * @namespace editor
 */

var request = require("superagent"),
    config = require("./editor.config"),
    util = require("./util");

/**
 * @author Anthony Pizzimenti
 * @desc Adds an image (from url) to the editor.
 * @memberof editor
 * @returns {undefined}
 */
function addImage() {
    document.getElementById("addImage-button").addEventListener("click", function() {
        var editor = document.getElementsByClassName("ql-editor")[0],
            url = window.prompt("Enter the image's URL:"),
            img = new Image();

        if (url) {
            img.src = url;
            editor.appendChild(img);
        }
    });
}

/**
 * @author Anthony Pizzimenti
 * @desc Cancels editing and returns the window to the list of posts.
 * @memberof editor
 * @returns {undefined}
 */
function cancel() {
    document.getElementById("cancel-button").addEventListener("click", function() {
        var cancel = window.confirm("Are you sure? All your changes will be erased, and you'll be returned to the post list.");
        if (cancel)
            window.location.pathname = "/posts";
    });
}

/**
 * @author Anthony Pizzimenti
 * @desc Grabs the contents of the editor and passes them to the appropriate save method.
 * @memberof editor
 * @param {boolean} existing Is there a post with this user id already in the database?
 * @param {number} created Time of the post's creation.
 * @returns {undefined}
 */
function save(existing, created) {
    document.getElementById("save-button").addEventListener("click", function() {

        // get whatever's in the editor at save time
        var editor = document.getElementsByClassName("ql-editor")[0],
            title = document.querySelector("#title"),
            subtitle = document.querySelector("#subtitle"),
            published = document.getElementById("published"),
            Post = {};

        if (existing) saveExistingPost(window.location.pathname.split("/")[2], Post, editor, title, subtitle, created, published);
        else saveNewPost(Post, editor, title, subtitle);
    });
}

/**
 * @author Anthony Pizzimenti
 * @desc Saves a new post.
 * @memberof editor
 * @param {object} Post The existing Post object.
 * @param {string} editor Contents of the editor field.
 * @param {string} title Contents of the title field.
 * @param {string} subtitle Contents of the subtitle field.
 * @param {boolean} published Is this published to the default post listing?
 * @returns {undefined}
 */
function saveNewPost(Post, editor, title, subtitle, published) {
    if (!title.value) {
        window.alert("Post wasn't saved - you need a title!");
        return;
    }
    
    Post.title = title.value;
    Post.subtitle = subtitle.value ? subtitle.value : "";
    Post.body = editor.innerHTML;
    Post.created = Date.now();
    Post.published = published.checked;

    request
        .post("/api/posts/save")
        .send(Post)
        .set("Content-Type", "application/json")
        .end(function(err, res) {
            if (err) window.alert("Couldn't be saved.");
            else if (res) {
                window.alert("Saved.");
                window.location.pathname = "/posts";
            }
        });
}

/**
 * @author Anthony Pizzimenti
 * @desc Saves an existing post.
 * @memberof editor
 * @param {string} id The post's database unique id.
 * @param {object} Post A Post object.
 * @param {string} editor Contents of the editor field
 * @param {string} title Contents of the title field.
 * @param {string} subtitle Contents of the subtitle field (if any).
 * @param {number} created UNIX timestring of when the post was created.
 * @param {boolean} published Is this published to the default post listing?
 * @returns {undefined}
 */
function saveExistingPost(id, Post, editor, title, subtitle, created, published) {
    Post.title = title.value;
    Post.subtitle = subtitle.value;
    Post.body = editor.innerHTML;
    Post.created = created;
    Post.updated = Date.now();
    Post.published = published.checked;

    request
        .post("/api/posts/save/" + id)
        .send(Post)
        .set("Content-Type", "application/json")
        .end(function(err, res) {
            if (err) window.alert("Changes couldn't be saved. Here's why:\n" + err);
            else if (res) {
                window.alert("Saved.");
                window.location.pathname = "/posts";
            }
        });
}

/**
 * @author Anthony Pizzimenti
 * @desc Retrieves a specific post.
 * @memberof editor
 * @param {function} callback Called when the request to /api/posts completes.
 * @param {string} id Requested post's unique id.
 * @returns {undefined}
 */
function retrievePost(callback, id) {
    request
        .get("/api/posts/" + id)
        .end(function(req, res) {
            callback(JSON.parse(res.text));
            save(true, JSON.parse(res.text).created);
        });
}

/**
 * @author Anthony Pizzimenti
 * @desc Populates the editor with existing post data.
 * @memberof editor
 * @param {object} data Post data.
 * @returns {undefined}
 */
function populate(data) {
    var editor = document.getElementsByClassName("ql-editor")[0],
        title = document.getElementById("title"),
        subtitle = document.getElementById("subtitle"),
        published = document.getElementById("published");

    document.title = data.title + " (editing)";
    editor.innerHTML = data.body;
    title.value = data.title;
    subtitle.value = data.subtitle;
    published.checked = data.published;
}

/**
 * @author Anthony Pizzimenti
 * @desc Checks if there's a user logged in. If not, redirect them to the login page.
 * @memberof editor
 * @see editor.addImage
 * @see editor.cancel
 * @see editor.configureEditor
 * @param {object} res Response from authentication server.
 * @param {boolean} existing Is this an existing post?
 * @returns {undefined}
 */
function redirectIfNotAuth(res, existing) {
    if (res == false) window.location.pathname = "/login";

    if (existing) retrievePost(populate, window.location.pathname.split("/")[2]);
    else {
        save(false);
        saveThought();
    }

    config();
    addImage();
    cancel();
}

/**
 * @author Anthony Pizzimenti
 * @desc Saves a thought.
 * @memberof editor
 * @returns {undefined}
 */
function saveThought() {
    var body = document.getElementById("thought-editor"),
        save = document.getElementById("thought-save"),
        Thought = {};

    save.addEventListener("click", function() {
        Thought = { body: body.value, created: Date.now() };

        request
            .post("/api/thoughts")
            .send(Thought)
            .set("Content-Type", "application/json")
            .end(function(err, res) {
                if (err) window.alert("Thought couldn't be saved.");
                else if (res) {
                    window.alert("Saved.");
                    body.value = "";
                }
            });
    });
}

module.exports = function() {
    var loc = window.location.pathname.split("/");
    if (loc.length < 3) {
        util.onLoad("editor", function() {
            util.checkAuth(function(user) {
                redirectIfNotAuth(user, false);
            });
        });
    } else if (loc.length >= 3 && loc[1] == "editor") {
        util.onLoad("isEditor", function() {
            util.checkAuth(function(res) {
                redirectIfNotAuth(res, true);
            });
        });
    }
};
