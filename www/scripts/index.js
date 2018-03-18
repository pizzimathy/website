
var login = require("./login")(),
    editor = require("./editor")(),
    math = require("./math")(),
    posts = require("./allPosts")(),
    post = require("./post")(),
    util = require("./util");


function u (u) { +u };

util.onLoad("", function () {
    util.checkAuth(u);
});

util.onLoad("contact", function () {
    util.checkAuth(u);
});
