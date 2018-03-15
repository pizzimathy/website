
var request = require("superagent"),
    util = require("./util");

/**
 * @author Anthony Pizzimenti
 * @desc Logs in a given user.
 * @returns {undefined}
 */
function login() {

    var button = document.getElementById("login-button"),
        username, password;

    button.addEventListener("click", function () {
        var username = document.querySelector("#username").value,
            password = document.querySelector("#password").value,
            badLogin = document.getElementsByClassName("bad-login")[0];

        request
            .post("/api/login")
            .send({username: username, password: password})
            .set("Content-Type", "application/json")
            .end(function (err, res) {
                if (err)
                    badLogin.style.display = "block";
                else
                    window.location.pathname = "/";
            });
    });
}

module.exports = function () {
    util.onLoad("login", function () {
        login();
    });
}
