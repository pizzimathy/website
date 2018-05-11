
var login = require("./login"),
    editor = require("./editor"),
    math = require("./math"),
    posts = require("./allPosts"),
    post = require("./post"),
    util = require("./util"),
    home = require("./home"),
    thoughts = require("./thoughts");

// load pages with js
thoughts();
login();
editor();
math();
posts();
post();
home();

// load pages with no js
util.onLoad("contact");
util.onLoad("quotes");
