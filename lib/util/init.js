
var firebase = require("firebase");

module.exports = function() {
    firebase.initializeApp(
        {
            apiKey: "AIzaSyAovYjGtp8sF0e5f9cH67oHuWm0z8BpB38",
            authDomain: "website-5e265.firebaseapp.com",
            databaseURL: "https://website-5e265.firebaseio.com",
            projectId: "website-5e265",
            storageBucket: "website-5e265.appspot.com",
            messagingSenderId: "71887527881"
        }
    );
};
