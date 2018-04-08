
/**
 * @namespace thoughts
 */

var funk = require("da_funk"),
    request = require("superagent"),
    util = require("./util");

/**
 * @author Anthony Pizzimenti
 * @desc Parent function for the thoughts namespace.
 * @memberof thoughts
 * @param {object|boolean} loggedIn Is there a user object logged in?
 * @returns {undefined}
 */
function thoughts(loggedIn) {
    request
        .get("/api/thoughts")
        .end(function(err, res) {
            if (err) console.warn(`Error fetching thoughts. Here's why: \n\n${err}`);
            else displayThoughts(JSON.parse(res.text).thoughts.reverse(), loggedIn);
        });
}

/**
 * @author Anthony Pizzimenti
 * @desc Appends thought levels to the stage.
 * @memberof thoughts
 * @param {object[]} thoughts Array of Thoughts sorted by creation date.
 * @param {object|boolean} loggedIn Is there a user logged in?
 * @returns {undefined}
 */
function displayThoughts(thoughts, loggedIn) {
    var chunks = funk.methods.group(thoughts, 2),
        stage = document.getElementById("stage"),
        chunk, level;

    for (chunk of chunks) {
        level = createLevel(chunk, loggedIn);
        stage.appendChild(level);
    }
}

/**
 * @author Anthony Pizzimenti
 * @desc Creates a new level and assigns Thoughts.
 * @memberof thoughts
 * @param {object[]} chunk A chunk of one or two Thought objects.
 * @param {object|boolean} loggedIn Is there a user logged in?
 * @returns {HTMLDivElement} A wrapper for one or two Thoughts.
 */
function createLevel(chunk, loggedIn) {
    var level = document.createElement("div"),
        thought, i;

    // assign css class
    level.className = "level-container";

    for (i=0; i < chunk.length; i++) {
        thought = createThought(chunk[i], i, loggedIn);
        level.appendChild(thought);
    }

    return level;
}

/**
 * @author Anthony Pizzimenti
 * @desc Creates a thought container to be appended to a level.
 * @memberof thoughts
 * @param {lib.Thought} Thought A Thought object from the db.
 * @param {number} right Is this the right thought?
 * @param {object|boolean} loggedIn Is there a user logged in?
 * @returns {HTMLDivElement} A container for a Thought.
 */
function createThought(Thought, right, loggedIn) {
    var thought = document.createElement("div"),
        thoughtBody = document.createElement("p"),
        thoughtDate = document.createElement("p"),
        opts = {
            hour: "2-digit",
            minute: "2-digit",
            month: "long",
            day: "numeric"
        };

    // create new elements, assign css classes, append stuff
    thoughtBody.innerText = Thought.body;
    thoughtBody.className = "thought";
    thoughtDate.innerText = new Date(Thought.created).toLocaleDateString("en-EN", opts);

    // if there's a user logged in, give them a delete button!
    if (loggedIn) addDelete(thoughtDate, Thought.id);

    thought.appendChild(thoughtBody);
    thought.appendChild(thoughtDate);

    if (!right) thought.className = "level-left";
    else thought.className = "level-right";

    return thought;
}

/**
 * @author Anthony Pizzimenti
 * @desc Adds a delete button to a Thought if a user is logged in.
 * @memberof thoughts
 * @param {HTMLParagraphElement} date The date portion of a Thought's container.
 * @param {string} id Unique db id for the Thought.
 * @returns {undefined}
 */
function addDelete(date, id) {
    var button = `<button onClick="window.deleteThought('${id}')">&#8855;</button>`;
    date.innerHTML = button + date.innerText;
}

/**
 * @author Anthony Pizzimenti
 * @desc Deletes the Thought.
 * @memberof thoughts
 * @param {string} id Unique db id for the Thought.
 * @returns {undefined}
 */
function deleteThought(id) {
    request
        .delete(`/api/thoughts/${id}`)
        .end(function(err, res) {
            if (err) window.alert(`Thought couldn't be deleted. Here's why:\n\n${err}`);
            else {
                window.alert("Thought deleted.");
                window.location.reload();
            }
        });
}

module.exports = function() {
    util.onLoad("thoughts", function() {
        util.checkAuth(thoughts);
        window.deleteThought = deleteThought;
    });
};
