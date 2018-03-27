
var path = require("path");

module.exports = {
    entry: "./www/scripts/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist/")
    },
    externals: {
        Quill: "quill"
    },
    devtool: "#eval-source-map"
}
