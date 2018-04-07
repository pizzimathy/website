
/**
 * @namespace lib
 */

var express = require("express"),
    parser = require("body-parser"),
    path = require("path"),
    ip = require("ip"),
    morgan = require("morgan"),
    http = require("http"),
    https = require("https"),
    fs = require("fs"),

    app = express(),
    HTTP = 8080,
    HTTPS = 8000,

    routing = require("./routing"),
    util = require("./util"),

    assets = path.resolve(__dirname, "../assets"),
    styles = path.resolve(__dirname, "../styles"),
    scripts = path.resolve(__dirname, "../"),
    certs = path.resolve(__dirname, "./certs"),

    // https options
    opts;

// serve assets, styles, and scripts
app
    .use(express.static(assets))
    .use(express.static(styles))
    .use(express.static(scripts))
    .use(express.static(certs))
    .use(parser.json())
    .use(morgan("dev"));

app.use(function(req, res, next) {
    var trailing = /\?[^]*\//.test(req.url);
    if (req.url.substr(-1) === "/" && req.url.length > 1 && !trailing)
        res.redirect(301, req.url.slice(0, -1));
    else next();
});

util.init();
routing(app);

if (process.argv.length >= 3) {
    /* PRODUCTION MODE */
    // set up some options
    opts = {
        cert: fs.readFileSync("/etc/letsencrypt/live/apizzimenti.com/fullchain.pem"),
        key: fs.readFileSync("/etc/letsencrypt/live/apizzimenti.com/privkey.pem")
    };

    https.createServer(opts, app).listen(HTTPS, function() {
        console.log("> Server @" + ip.address() + " listening on " + HTTPS);
    });
} else {
    /* DEVELOPMENT MODE */
    http.createServer(app).listen(HTTP, function() {
        console.log("> Server @" + ip.address() + " listening on " + HTTP);
    });
}
