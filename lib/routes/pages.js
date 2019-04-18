
var path = require("path");

/**
 * @author Anthony Pizzimenti
 * @desc Sets up routing for static pages.
 * @param {express} app Express application.
 * @module routes
 * @returns {undefined}
 */
function pages(app) {
    var index = path.resolve(__dirname, "../../pages/index.html"),
        loginPage = path.resolve(__dirname, "../../pages/login.html"),
        editor = path.resolve(__dirname, "../../pages/editor.html"),
        contact = path.resolve(__dirname, "../../pages/contact.html"),
        posts = path.resolve(__dirname, "../../pages/posts.html"),
        post = path.resolve(__dirname, "../../pages/post.html"),
        existingEditor = path.resolve(__dirname, "../../pages/existingEditor.html"),
        thoughts = path.resolve(__dirname, "../../pages/thoughts.html"),
        quotes = path.resolve(__dirname, "../../pages/quotes.html"),
        about = path.resolve(__dirname, "../../pages/about.html"),

        // page urls
        indexUrl = app.route("/"),
        loginUrl = app.route("/login/"),
        editorUrl = app.route("/editor/"),
        editorSpecUrl = app.route("/editor/:id/"),
        contactUrl = app.route("/contact/"),
        postsUrl = app.route("/posts/"),
        postUrl = app.route("/posts/:id/"),
        thoughtsUrl = app.route("/thoughts/"),
        quotesUrl = app.route("/quotes/"),
        aboutUrl = app.route("/about/");

    // pages
    indexUrl.get(function(req, res) {
        res.sendFile(index);
    });

    loginUrl.get(function(req, res) {
        res.sendFile(loginPage);
    });

    editorUrl.get(function(req, res) {
        res.sendFile(editor);
    });

    editorSpecUrl.get(function(req, res) {
        res.sendFile(existingEditor);
    });

    contactUrl.get(function(req, res) {
        res.sendFile(contact);
    });

    postsUrl.get(function(req, res) {
        res.sendFile(posts);
    });

    postUrl.get(function(req, res) {
        res.sendFile(post);
    });

    thoughtsUrl.get(function(req, res) {
        res.sendFile(thoughts);
    });

    quotesUrl.get(function(req, res) {
        res.sendFile(quotes);
    });

    aboutUrl.get(function(req, res) {
        res.sendFile(about);
    });
}

module.exports = pages;
