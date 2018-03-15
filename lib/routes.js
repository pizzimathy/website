
var path = require("path"),
    db = require("./db");

function routes(app) {
    var Posts = new db.Posts(),
        Auth = new db.Auth(),

        // actual pages
        index = path.resolve(__dirname, "../www/pages/index.html"),
        loginPage = path.resolve(__dirname, "../www/pages/login.html"),
        editor = path.resolve(__dirname, "../www/pages/editor.html"),
        contact = path.resolve(__dirname, "../www/pages/contact.html"),
        posts = path.resolve(__dirname, "../www/pages/posts.html"),
        
        // page(s) for website
        indexUrl = app.route("/"),
        loginUrl = app.route("/login"),
        editorUrl = app.route("/editor"),
        contactUrl = app.route("/contact"),
        postsUrl = app.route("/posts")

        // api
        allPosts = app.route("/api/posts"),
        onePost = app.route("/api/posts/:id"),
        savePost = app.route("/api/posts/save"),

        login = app.route("/api/login"),
        loggedIn = app.route("/api/loggedIn");

    // pages
    indexUrl.get(function (req, res) {
        res.sendFile(index);
    });

    loginUrl.get(function (req, res) {
        res.sendFile(loginPage);
    });

    editorUrl.get(function (req, res) {
        res.sendFile(editor);
    });

    contactUrl.get(function (req, res) {
        res.sendFile(contact)
    });

    postsUrl.get(function (req, res) {
        res.sendFile(posts);
    }); 

    allPosts.get(function (req, res) {
        Posts.getAll(function (snapshot) {
            var titles = [],
                keys = [],
                post;

            snapshot.forEach(function (postSnapshot) {
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

    onePost.get(function (req, res) {
        Posts.get(req.params.id, function (data) {
            res.send(data);
        });
    });

    savePost.post(function (req, res) {
        Posts.save(req.body,
            function (data) {
                res.status(200).send(true);
            },
            function (err) {
                res.status(500).send(err);
            }
        );
    });

    login.post(function (req, res) {
        Auth.login(req.body.username, req.body.password,
            function (data) {
                res.status(200).send(true);
            },
            function (err) {
                res.status(401).send(false);
            }
        );
    });

    loggedIn.get(function (req, res) {
        Auth.isLoggedIn(function (user) {
            if (user)
                res.send(true);
            else
                res.send(false);
        });
    });
}

module.exports = routes;