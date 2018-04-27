
/**
 * @module db
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

    // is this a production server?
    prod = process.argv.length >= 3,

    // https options
    opts;

if (prod) {
    app.use(function(req, res, next) {
        if (!req.secure) {
            var secureUrl = "https://" + req.headers["host"] + req.url;
            res.writeHead(301, { "Location":  secureUrl });
            res.end();
        }
        next();
    });
}

// serve assets, styles, and scripts
app
    .use(express.static(assets))
    .use(express.static(styles))
    .use(express.static(scripts))
    .use(express.static(certs))
    .use(parser.json())
    .use(morgan("dev"));

util.init();
routing(app);

http.createServer(app).listen(HTTP, function() {
    console.log("> Server @" + ip.address() + " listening on " + HTTP);
});

/* 
    PRODUCTION MODE

    The HTTPS server is only instantiated when we run npm run serve --prod
    (or some other option, but who does that). All certificates generated
    Let's Encrypt.
*/
if (prod) {
    // set up some options
    opts = {
        cert: fs.readFileSync("/etc/letsencrypt/live/apizzimenti.com/fullchain.pem"),
        key: fs.readFileSync("/etc/letsencrypt/live/apizzimenti.com/privkey.pem")
    };

    https.createServer(opts, app).listen(HTTPS, function() {
        console.log("> Server @" + ip.address() + " listening on " + HTTPS);
    });
}
