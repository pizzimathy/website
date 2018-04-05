# website
Hopefully the title of the repo is self-explanatory. This is the code for my website.

## setup
### hooking into firebase
There's a file missing here: `lib/util/init.js`. I purposefully excluded it, as it contains the API information for firebase, and I'd rather not get compromised. So, if you want to use this site as a template, you just have to create your own. If you take a look at [the firebase docs](https://firebase.google.com/docs/database/web/start), you'll see that your file should look something like this (although I've edited mine for concision):

```
var firebase = require("firebase");

module.exports = function() {
    firebase.initializeApp(
        {
            apiKey: "<api-key>",
            authDomain: "<auth-domain>",
            databaseURL: "<database-url>",
            projectId: "<project-id>",
            storageBucket: "<bucket-id>",
        }
    );
};
```
Every token you need for this file can be found [in the firebase console](https://console.firebase.google.com/u/0/). Again, I've excluded mine for the sake of safety.

### building
You'll also need a few things in order to run build tasks. If you take a look at the [`package.json`](https://github.com/apizzimenti/website/blob/master/package.json) file, you'll notice that I don't use build tools aside from [webpack](https://webpack.js.org/). Additionally, most of my build tools are either simple node commands or in `util.sh`, which is executed in `package.json`. Just make sure that you've run `$ npm i` to install everything and that your computer can execute bash files. I'll eventually be porting this to a Makefile, but for now this is what I use.

There are two basic build processes: **development** and **production**. Running a development build just compiles styles and scripts so the server can spin up locally. On the other hand, production tests, cleans, builds, then copies to the `dist/` folder (which is created when a build is run). As of now, here's how each build works:

**To run a development build**, use `$ npm run build:dev`. This does a few tasks, and it'll spit a bunch of stuff out into the console. Here are the commands it runs, with subcommands noted as secondary bullets:

1. `$ npm run compile:sass` &rarr; compiles all the `.sass` files in the `www/styles` directory
    * `$ ./util.sh sass` (see the `sass()` function in this file)
2. `$ npm run compile:js:dev` &rarr; bundles dependencies and source script files from the `www/scripts` directory
    * `$ webpack --mode development --config webpack.config.js` (runs in development mode so it takes less time)
3. `$ npm run copy` &rarr; copies specific files in the `www/` directory to the `dist/` directory
    * `$ /util.sh copy` (see the `copy()` function in this file)

**To run a production build**, use `$ npm run build:prod`. It'll take a bit longer, but that's because it does way more stuff!

1. `$ npm run test` &rarr; runs frontend and backend tests
    * `$ eslint -c ./www/.eslintrc www/scripts/**`
    * `$ eslint -c ./lib/.eslintrc lib/**`
2. `$ npm run clean` &rarr; cleans out extraneous files for a clean build
    * `$ rm -rf dist`
    * `$ mkdir dist`
3. `$ npm run compile:sass`
4. `$ npm run compile:js:prod`
    * `$ webpack --mode production --config webpack.config.js` (performs tree-shaking, minification)
5. `$ npm run copy`

### serving
To test any build (development or production), simply use the `$ npm run serve` command. This will spin up a server on `localhost:8080`.

## programming
### minimum viable product
Adding pages to the website isn't especially hard. You only need (at minimum) one thing: an html file. Let's create a new page called `resources.html` at the path `/resources`.

Firstly, create a new file called `resources.html` in the `www/pages` directory. There's a basic template for the header that you can copy from any other page, and then add content to it. It'd look something like this:

```
############################
# www/pages/resources.html #
############################

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome :)</title>

    <!-- include stylesheets for the page and the header -->
    <link rel="stylesheet" href="header.css"/>
    <link rel="stylesheet" href="index.css"/>

    <!-- cute favicon (that you can change) -->
    <link rel="icon" href="8bit-pc.gif" type="image/gif"/>

    <!-- the first script renders math, the second is code we may edit later -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
    <script src="bundle.js"></script>
</head>
<body>
    <div id="header">
       <h1>apizzimenti</h1>
        <ul id="menu">
            <li class="listitem"><a href="/">Home</a></li>
            <li class="listitem"><a href="/contact">Contact</a></li>
            <li class="listitem"><a href="/posts">Posts</a></li>
            <li class="listitem"><a href="/editor">Editor</a></li>
            <li class="listitem"><a id="login" href="/login">Log In</a></li>
        </ul>
    </div>
    <div id="stage">
        <!-- write our list of resources here! -->
    </div>
    <div class="spacer"></div>
</body>
</html>
```
And we have our template! Next, we have to edit the `lib/routes` file so that our page actually gets served:

```
#################
# lib/routes.js #
#################

var path = require("path"),
    db = require("./db");

function routes(app) {
    var Posts = new db.Posts(),
        Auth = new db.Auth(),

        // actual pages
        index = path.resolve(__dirname, "../pages/index.html"),
        ...
        resources = path.resolve(__dirname, "../pages/resources.html"),
        ...

        // page urls
        indexUrl = app.route("/"),
        ...
        resourcesUrl = app.route("/resources"),
        ...

    // pages
    indexUrl.get(function(req, res) {
        res.sendFile(index);
    });
    ...
    resourcesUrl.get(function (req, res) {
        res.sendFile(resources)
    });
    ...
}
```
And there we go! Your page gets added.

### scripting
Now say that we want to add some javascript to this page. We'll create a new script for it in the `lib/scripts` directory and call it `resources.js`.

```
############################
# www/scripts/resources.js #
############################

// import the util file, as it's required to load the page
var util = require("./util"),
    ...

// function that initializes everything you want to do on the page
function main() { ... }

/*
    Export our function and say that it'll run only when we're on the resources page.
    Please read the docs for util.onLoad() and util.checkAuth(), as there are some pages
    (especially those with changing titles, like /posts/<post_id>) that must be handled
    specifically. For this case, though, sayHello() will run automatically.
*/
module.exports = function () {
    util.onLoad("resources", function() {
        /*
            There are two scenarios: either your content relies on a user being logged
            in, or it doesn't. Here's the first scenario, where there's a login required:
        */
        util.checkAuth(function(user) {
            if (user) main()                            // if there's a user logged in, do your thing!
            else window.location.pathname = "/login"    // otherwise, redirect the user
        });
        
        /*
            Here's the second scenario. In this case, we don't have to write a callback for
            util.checkAuth(), we just give it a function that does nothing and then call
            main() regardless.
        */
        util.checkAuth(function(u){ +u}) // the callback can be any function at all
        main()                          // call our main() function!
    });
};
```

Then, we edit the `www/index.js` file to include our page:

```
################
# www/index.js #
################

var login = require("./login"),
    ...
    resources = require("./resources"),
    ...

login();
...
resources();
...
```

And we're done! For more examples of how to write and include more complex javascript, look at any of the javascript files in the `www/scripts` directory. However, there's a simpler way to do this (if the `/resources` page doesn't have any need for complex javascript). We can simply omit creating the `www/scripts/resources.js` file, and edit `www/index.js`:

```
################
# www/index.js #
################


var login = require("./login"),
    ...

function u(u) { +u; }

util.onLoad("", function() {
    util.checkAuth(u);
});

util.onLoad("resources", function() {
    util.checkAuth(u);
});

...

```

[Always, always check the docs](http://apizzimenti.github.io/site-docs) to make sure that everything is squared away.

## hosting
I use Amazon's AWS for hosting. I have an EC2 instance running server code which links out to firebase anytime it needs data. All traffic is routed through there.

## documentation
Make sure to document your work. If I accept pull requests, I'll write the jsdoc stuff myself (so we aren't cluttered with documentation).