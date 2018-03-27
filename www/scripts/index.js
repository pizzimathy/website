
var login = require("./login"),
    editor = require("./editor"),
    math = require("./math"),
    posts = require("./allPosts"),
    post = require("./post"),
    util = require("./util");

login();
editor();
math();
posts();
post();

/**
 * @author Anthony Pizzimenti
 * @desc Avoids checking authentication while still loading everything.
 * @param {*} u Dummy variable.
 * @returns {undefined}
 */
function u(u) { +u; }

util.onLoad("", function() {
    util.checkAuth(u);
});

util.onLoad("contact", function() {
    util.checkAuth(u);
});
