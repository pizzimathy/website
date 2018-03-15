
var toolbarOptions = [
        ["bold", "italic", "underline", "strike"],        // toggled buttons
        ["blockquote", "code-block"],

        [{ "header": 1 }, { "header": 2 }],               // custom button values
        [{ "list": "ordered"}, { "list": "bullet" }],

        ["link"],

        ["clean"]                                         // remove formatting button
    ];

/**
 * @author Anthony Pizzimenti
 * @desc Configures an editor object on the editor page.
 * @returns {undefined}
 */
function configureEditor () {
    // instantiate an editor
    var q = new Quill("#editor", {
        modules: {
            toolbar: toolbarOptions
        },
        theme: "snow"
    });
}

module.exports = configureEditor;
