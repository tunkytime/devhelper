require("dotenv").config();
var express = require('express')
var exphbs = require('express-handlebars')

var session = require('express-session')
var passport = require('passport')

var db = require("./models");

var app = express()
var PORT = process.env.PORT || 3000;

// middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(express.static("public"));

// for passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// for Handlebars
app.set('views', './views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// routes
require('./routes/auth')(app, passport);
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// load passport strategies
require("./config/passport/passport")(passport, db.User);

var syncOptions = {
    force: false
};

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