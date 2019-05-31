require("dotenv").config();

var express = require('express')
var exphbs = require('express-handlebars')
var session = require('express-session')
var passport = require('passport')
var axios = require("axios");

var db = require("./models");

var app = express()
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(express.static("public"));

// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// For Handlebars
app.set('views', './views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Routes
require('./routes/auth')(app, passport);
require("./routes/htmlroutes")(app);
require("./routes/apiroutes")(app);

// Load passport strategies
require("./config/passport/passport")(passport, db.user);

var syncOptions = {
    force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
    app.listen(PORT, function () {
        console.log(
            "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
            PORT,
            PORT
        );
    });
});

module.exports = app;