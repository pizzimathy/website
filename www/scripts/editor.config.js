
/**
 * @author Anthony Pizzimenti
 * @memberof editor
 * @see editor.redirectIfNotAuth
 * @desc Configures an editor object on the editor page.
 * @returns {undefined}
 */
function configureEditor() {
    // instantiate an editor
    var toolbarOptions = [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ "header": 1 }, { "header": 2 }],
            [{ "list": "ordered"}, { "list": "bullet" }],
            ["link"]
        ];
        q = new Quill("#editor", {
        modules: {
            toolbar: toolbarOptions
        },
        theme: "snow"
    });
}

module.exports = configureEditor;
