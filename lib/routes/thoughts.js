
/**
 * @author Anthony Pizzimenti
 * @desc Sets up routing for the thoughts api. We use the same data snapshot idea
 * as lib.Posts. See firebase.google.com/docs/reference/js/firebase.database.DataSnapshot
 * for more info. This is the right way to do this snapshot thing.
 * @module routes
 * @param {lib.Thoughts} Thoughts Thoughts module.
 * @param {express} app Express app.
 * @returns {undefined}
 */
function thoughts(Thoughts, app) {
    var recentThoughts = app.route("/api/thoughts/"),
        saveThought = app.route("/api/thoughts/"),
        deleteThought = app.route("/api/thoughts/:id");

    // get the 10 most recent Thoughts
    recentThoughts.get(function(req, res) {
        Thoughts.last(function(snapshot) {
            var thoughts = [],
                thought;

            // for each Thought snapshot, assign the uID as a property and shove the
            // Thought object into a list of Thoughts
            snapshot.forEach(function(thoughtSnap) {
                thought = thoughtSnap.val();
                thought["id"] = thoughtSnap.key;
                thoughts.push(thought);
            });

            // return the list of Thought objects
            res.send({ thoughts: thoughts });
        });
    });

    saveThought.post(function(req, res) {
        Thoughts.save(req.body,
            function() {
                res.status(200).send(true);
            },
            function(err) {
                res.status(500).send(err);
            }
        );
    });

    deleteThought.delete(function(req, res) {
        Thoughts.delete(req.params.id,
            function() {
                res.status(200).send(true);
            },
            function(err) {
                res.status(500).send(err);
            }
        );
    });
}

module.exports = thoughts;
