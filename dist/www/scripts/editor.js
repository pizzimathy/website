
var request = require("superagent"),
    config = require("./editor.config"),
    util = require("./util");

function cancel() {
    document.getElementById("cancel-button").addEventListener("click", function () {
        var cancel = window.confirm("Are you sure? All your changes will be erased, and you'll be returned to the post list.");
        if (cancel)
            window.location.pathname = "/posts";
    });
}

function save(existing, created) {
    document.getElementById("save-button").addEventListener("click", function () {

        // get whatever's in the editor at save time
        var editor = document.getElementsByClassName("ql-editor")[0],
            title = document.querySelector("#title"),
            subtitle = document.querySelector("#subtitle"),
            Post = {};

        if (existing)
            saveExistingPost(window.location.pathname.split("/")[2], Post, editor, title, subtitle, created);
        else
            saveNewPost(Post, editor, title, subtitle);
    });
}

function saveNewPost(Post, editor, title, subtitle) {
    if (!title.value) {
        window.alert("Post wasn't saved - you need a title!");
        return;
    }
    
    Post.title = title.value;
    Post.subtitle = subtitle.value ? subtitle.value : "";
    Post.body = editor.innerHTML;
    Post.created = Date.now();

    request
        .post("/api/posts/save")
        .send(Post)
        .set("Content-Type", "application/json")
        .end(function (err, res) {
            if (err)
                window.alert("Couldn't be saved.");
            else if (res)
                window.alert("Saved.");
                window.location.pathname = "/posts";
        });
}

function saveExistingPost(id, Post, editor, title, subtitle, created) {
    Post.title = title.value;
    Post.subtitle = subtitle.value;
    Post.body = editor.innerHTML;
    Post.created = created;

    request
        .post("/api/posts/save/" + id)
        .send(Post)
        .set("Content-Type", "application/json")
        .end(function (err, res) {
            if (err)
                window.alert("Couldn't be saved.");
            else if (res)
                window.alert("Saved.");
                window.location.pathname = "/posts";
        });
}

function retrievePost(callback, id) {
    request
        .get("/api/posts/" + id)
        .end(function (req, res) {
            callback(JSON.parse(res.text));
            save(true, JSON.parse(res.text).created);
        });
}

function populate(data) {
    var editor = document.getElementsByClassName("ql-editor")[0],
        title = document.getElementById("title"),
        subtitle = document.getElementById("subtitle");

    document.title = data.title + " (editing)";
    editor.innerHTML = data.body;
    title.value = data.title;
    subtitle.value = data.subtitle;
}

function redirectIfNotAuth(res, existing) {
    if (res.text == "false")
        window.location.pathname = "/login";

    if (existing) {
        retrievePost(populate, window.location.pathname.split("/")[2]);
    } else {
        save(false);
    }

    cancel();
    config();
}

module.exports = function () {
    var loc = window.location.pathname.split("/");
    if (loc.length < 3) {
        util.onLoad("editor", function () {
            util.checkAuth(function (res) {
                redirectIfNotAuth(res, false);
            });
        });
    } else if (loc.length >= 3 && loc[1] == "editor") {
        util.onLoad("isEditor", function () {
            util.checkAuth(function (res) {
                redirectIfNotAuth(res, true);
            });
        });
    }
}
