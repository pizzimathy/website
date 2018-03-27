
var express = require("express"),
    parser = require("body-parser"),
    path = require("path"),
    ip = require("ip"),
    morgan = require("morgan"),

    app = express(),
    PORT = 8080,
    routes = require("./routes"),

    assets = path.resolve(__dirname, "../assets"),
    styles = path.resolve(__dirname, "../styles"),
    scripts = path.resolve(__dirname, "../");

// serve assets, styles, and scripts
app
    .use(express.static(assets))
    .use(express.static(styles))
    .use(express.static(scripts))
    .use(parser.json())
    .use(morgan("dev"));

routes(app);

app.listen(PORT, function() {
    console.log("> Server @" + ip.address() + " listening on " + PORT);
});