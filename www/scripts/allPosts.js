
var request = require("superagent"),
    util = require("./util"),
    math = require("./math");

function getPostData(callback, loggedIn) {
    request
        .get("/api/posts/")
        .end(function (err, res) {
            callback(JSON.parse(res.text), loggedIn); 
        });
}

function createPostLinks(data, loggedIn) {
    var stage = document.getElementById("stage"),
        href = "/posts/",
        titles = data.titles,
        keys = data.keys,
        i, preview;

    for (i = 0; i < titles.length; i++) {
        preview = document.createElement("div");
        preview.className = "preview";
        preview.innerHTML = "<a style=\"font-weight: bold\" target=\"blank\" href=\"" + keys[i] + "\">" + titles[i] + "</a>";

        if (loggedIn)
            preview.innerHTML += " <a style=\"font-size:12px\" href=\"/editor/\"" + keys[i] + "\">(edit)</a>";

        stage.appendChild(preview);
        math();
    }
}

function displayEditIfAuth(res) {
    if (res.text == "false")
        getPostData(createPostLinks, false);

    getPostData(createPostLinks, true);
}

module.exports = function() {
    util.onLoad("posts", function () {
        util.checkAuth(displayEditIfAuth)
    });
}
