
var path = require("path"),
    db = require("./db");

/**
 * @author Anthony Pizzimenti
 * @desc Does all the routing for the website.
 * @param {express} app Express app that needs routing.
 * @returns {undefined}
 */
function routes(app) {
    var Posts = new db.Posts(),
        Auth = new db.Auth(),
        resourcePath = "../dist/",

        // actual pages
        index = path.resolve(__dirname, resourcePath + "pages/index.html"),
        loginPage = path.resolve(__dirname, resourcePath + "pages/login.html"),
        editor = path.resolve(__dirname, resourcePath + "pages/editor.html"),
        contact = path.resolve(__dirname, resourcePath + "pages/contact.html"),
        posts = path.resolve(__dirname, resourcePath + "pages/posts.html"),
        post = path.resolve(__dirname, resourcePath + "pages/post.html"),
        existingEditor = path.resolve(__dirname, resourcePath + "pages/existingEditor.html"),
        
        // page(s) for website
        indexUrl = app.route("/"),
        loginUrl = app.route("/login"),
        editorUrl = app.route("/editor"),
        editorSpecUrl = app.route("/editor/:id"),
        contactUrl = app.route("/contact"),
        postsUrl = app.route("/posts"),
        postUrl = app.route("/posts/:id"),

        // api
        allPosts = app.route("/api/posts"),
        onePost = app.route("/api/posts/:id"),
        savePost = app.route("/api/posts/save"),
        saveOne = app.route("/api/posts/save/:id"),

        login = app.route("/api/login"),
        logout = app.route("/api/logout");

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

    allPosts.get(function(req, res) {
        Posts.getAll(function(snapshot) {
            var titles = [],
                keys = [],
                post;

            snapshot.forEach(function(postSnapshot) {
                post = postSnapshot.val();
                titles.push(post.title);
                keys.push(postSnapshot.key);
            });

            res.send({
                titles: titles,
                keys: keys
            });
        });
    });

    onePost.get(function(req, res) {
        Posts.get(req.params.id, function(data) {
            res.send(data);
        });
    });

    savePost.post(function(req, res) {
        Posts.save(req.body,
            function() {
                res.status(200).send(true);
            },
            function(err) {
                res.status(500).send(err);
            }
        );
    });

    saveOne.post(function(req, res) {
        Posts.saveOne(req.params.id, req.body,
            function() {
                res.status(200).send(true);
            },
            function(err) {
                res.status(500).send(err);
            }
        );
    });

    login.post(function(req, res) {
        Auth.login(req.body.username, req.body.password,
            function(data) {
                res.status(200).send(data);
            },
            function(err) {
                res.status(401).send(false);
            }
        );
    });

    logout.get(function(req, res) {
        Auth.signOut(function(_) {
            if (_)
                res.status(200);
            else
                res.status(500);
            res.send(_);
        });
    });
}

module.exports = routes;