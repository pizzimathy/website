
var express = require("express"),
    parser = require("body-parser"),
    path = require("path"),
    ip = require("ip"),
    morgan = require("morgan"),
    parser = require("body-parser"),

    app = express(),
    PORT = 8000,
    routes = require("./routes"),

    assets = path.resolve(__dirname, "../www/assets"),
    styles = path.resolve(__dirname, "../www/styles"),
    scripts = path.resolve(__dirname, "../www/dist");

// serve assets, styles, and scripts
app
    .use(express.static(assets))
    .use(express.static(styles))
    .use(express.static(scripts))
    .use(parser.json())
    .use(morgan("dev"));

routes(app);

app.listen(PORT, function () {
    console.log("> Server @" + ip.address() + " listening on " + PORT);
});