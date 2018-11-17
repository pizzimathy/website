
/**
 * @author Anthony Pizzimenti
 * @desc Renders display math.
 * @returns {undefined}
 */
function math() {
    var config = {
        tex2jax: {
            inlineMath: [
                ["$", "$"],
                ["\\(", "\\)"]
            ],
            processEscapes: true
        },
        jax: ["input/TeX", "output/HTML-CSS"],
        "HTML-CSS": {
            fonts: ["Latin-Modern"]
        }
    };

    MathJax.Hub.Config(config);
    MathJax.Hub.Typeset("stage");

    // if there's an error, just try to typeset it again
    MathJax.Hub.Register.MessageHook("Math Processing Error", function(message) {
        MathJax.Hub.Typeset("stage");
    });
}

module.exports = math;
