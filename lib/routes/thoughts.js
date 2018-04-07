
/**
 * @author Anthony Pizzimenti
 * @desc Sets up routing for the thoughts api.
 * @param {lib.Thoughts} Thoughts Thoughts module.
 * @param {express} app Express app.
 * @returns {undefined}
 */
function thoughts(Thoughts, app) {
    var recentThoughts = app.route("/api/thoughts"),
        saveThought = app.route("/api/thoughts"),
        deleteThought = app.route("/api/thoughts/:id");

    recentThoughts.get(function(req, res) {
        Thoughts.last(function(snapshot) {
            var thoughts = [],
                thought;

            snapshot.forEach(function(thoughtSnap) {
                thought = thoughtSnap.val();
                thought["id"] = thoughtSnap.key;
                thoughts.push(thought);
            });

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
