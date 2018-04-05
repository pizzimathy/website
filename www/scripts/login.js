
/**
 * @namespace login
 */

var request = require("superagent"),
    util = require("./util");

/**
 * @author Anthony Pizzimenti
 * @desc Logs in a given user.
 * @memberof login
 * @returns {undefined}
 */
function login() {

    var button = document.getElementById("login-button"),
        username, password, badLogin;

    button.addEventListener("click", function() {
        username = document.querySelector("#username").value;
        password = document.querySelector("#password").value;
        badLogin = document.getElementsByClassName("bad-login")[0];

        request
            .post("/api/login")
            .send({username: username, password: password})
            .set("Content-Type", "application/json")
            .end(function(err, res) {
                if (err) badLogin.style.display = "block";
                else {
                    util.storeUser(JSON.parse(res.text));
                    window.location.pathname = "/";
                    window.location.reload();
                }
            });
    });
}

module.exports = function() {
    util.onLoad("login", function() {
        // on page load, check if the user is authorized
        util.checkAuth(function(user) {
            if (user) window.history.back();
            else login();
        });
    });
};
