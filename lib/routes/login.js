
/**
 * @author Anthony Pizzimenti
 * @desc Sets up the api routes for logging in.
 * @param {lib.Auth} Auth Authentication module.
 * @param {express} app Express application.
 */
function login(Auth, app) {
    var login = app.route("/api/login"),
        logout = app.route("/api/logout");

    // log-in stuff
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

module.exports = login;
