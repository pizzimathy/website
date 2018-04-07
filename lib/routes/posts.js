
/**
 * @author Anthony Pizzimenti
 * @desc Sets up routing for the posts api.
 * @param {lib.Posts} Posts Posts module.
 * @param {express} app Express app.
 * @returns {undefined}
 */
function posts(Posts, app) {
    var allPosts = app.route("/api/posts"),
        onePost = app.route("/api/posts/:id"),
        savePost = app.route("/api/posts/save"),
        saveOne = app.route("/api/posts/save/:id");

    allPosts.get(function(req, res) {
        Posts.getAll(function(snapshot) {
            var titles = [],
                keys = [],
                subtitles = [],
                times = [],
                post;

            snapshot.forEach(function(postSnapshot) {
                post = postSnapshot.val();
                titles.push(post.title);
                keys.push(postSnapshot.key);
                subtitles.push(post.subtitle);
                times.push(post.created);
            });

            res.send({
                titles: titles,
                keys: keys,
                subtitles: subtitles,
                times: times
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
}

module.exports = posts;
