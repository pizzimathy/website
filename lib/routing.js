
/**
 * @module routes
 */

var db = require("./db"),
    routes = require("./routes");

/**
 * @author Anthony Pizzimenti
 * @desc Does all the routing for the website.
 * @memberof db
 * @param {express} app Express app that needs routing.
 * @returns {undefined}
 */
function routing(app) {
    var Auth = new db.Auth(),
        Posts = new db.Posts(),
        Thoughts = new db.Thoughts();

    routes.pages(app);
    routes.login(Auth, app);
    routes.posts(Posts, app);
    routes.thoughts(Thoughts, app);
}

module.exports = routing;