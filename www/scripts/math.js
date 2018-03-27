
module.exports = function() {
    var config = {
        tex2jax: {inlineMath: [["$", "$"], ["\\(", "\\)"]]},
        jax: ["input/TeX", "output/HTML-CSS"],
        "HTML-CSS": {
            fonts: ["Latin-Modern"]
        }
    };

    MathJax.Hub.Config(config);
    MathJax.Hub.Typeset("stage");
};
