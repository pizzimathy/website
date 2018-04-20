
var login = require("./login"),
    editor = require("./editor"),
    math = require("./math"),
    posts = require("./allPosts"),
    post = require("./post"),
    util = require("./util"),
    home = require("./home"),
    thoughts = require("./thoughts");

thoughts();
login();
editor();
math();
posts();
post();
home();

util.onLoad("contact");
