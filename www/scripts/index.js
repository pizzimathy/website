
/**
 * @namespace index
 */

var login = require("./login"),
    editor = require("./editor"),
    math = require("./math"),
    posts = require("./allPosts"),
    post = require("./post"),
    util = require("./util"),
    home = require("./home");

login();
editor();
math();
posts();
post();
home();

util.onLoad("contact", function() {
    util.checkAuth(util.u);
});
