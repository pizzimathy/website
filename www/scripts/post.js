
var request = require("superagent"),
    util = require("./util"),
    math = require("./math");

function getPostData(callback, loggedIn) {
    var id = window.location.pathname.split("/")[2];
    request
        .get("/api/posts/" + id)
        .end(function (req, res) {
            callback(JSON.parse(res.text), loggedIn);
        });
}

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

function displayEditIfAuth(res) {
    if (res.text == "false")
        getPostData(displayPost, false);
    else
        getPostData(displayPost, true);
}

module.exports = function () {
    if (window.location.pathname.split("/").length >= 3 && window.location.pathname.split("/")[1] == "posts") {
        util.onLoad("isPost", function () {
            util.checkAuth(displayEditIfAuth);
        });
    }
}
