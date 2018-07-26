
/**
 * @author Anthony Pizzimenti
 * @desc Sets up routing for the posts api. For more info on the data snapshot,
 * take a look at firebase.google.com/docs/reference/js/firebase.database.DataSnapshot.
 * @module routes
 * @param {lib.Posts} Posts Posts module.
 * @param {express} app Express app.
 * @returns {undefined}
 *
 * @todo Refactor this to return a list of uID-augmented objects rather than multiples
 * lists that have to be reorganized. This is bad code.
 */
function posts(Posts, app) {
    var allPosts = app.route("/api/posts/"),
        onePost = app.route("/api/posts/:id/"),
        savePost = app.route("/api/posts/save/"),
        saveOne = app.route("/api/posts/save/:id/");

    allPosts.get(function(req, res) {

        // get our data snapshot; the purpose of this is to grab the uIDs of posts
        Posts.getAll(function(snapshot) {
            var titles = [],
                keys = [],
                subtitles = [],
                times = [],
                published = [],
                post;

            // for each post in the snapshot, shove values into the arrays
            snapshot.forEach(function(postSnapshot) {
                post = postSnapshot.val();
                titles.push(post.title);
                keys.push(postSnapshot.key);
                subtitles.push(post.subtitle);
                times.push(post.created);
                published.push(post.published);
            });

            // send back an object containing ordered lists.
            res.send({
                titles: titles,
                keys: keys,
                subtitles: subtitles,
                times: times,
                published: published
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
