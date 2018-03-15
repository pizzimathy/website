
var request = require("superagent"),
    config = require("./editor.config"),
    util = require("./util");

function save() {
    document.getElementById("save-button").addEventListener("click", function () {

        // get whatever's in the editor at save time
        var editor = document.getElementsByClassName("ql-editor")[0],
            title = document.querySelector("#title"),
            subtitle = document.querySelector("#subtitle"),
            Post = {};

        Post.title = title.value;
        Post.subtitle = subtitle.value;
        Post.body = editor.innerHTML;
        Post.published = published.checked;

        request
            .post("/api/posts/save")
            .send(Post)
            .set("Content-Type", "application/json")
            .end(function (err, res) {
                
            });
    });
}

module.exports = function () {
    util.onLoad("editor",
        function () {

            // check if logged in
            request
                .get("/api/loggedIn")
                .end(function (err, res) {
                    console.log(err, res);
                    if (res.text == "false")
                        window.location.pathname = "/login";

                    config();
                });
        }
    );
}
