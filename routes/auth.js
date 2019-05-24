var authController = require("../controllers/authcontroller.js");
var db = require("../models");

module.exports = (app, passport) => {
    app.get("/signup", authController.signup);

    app.get("/signin", authController.signin);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }));

    app.get("/dashboard", isLoggedIn, authController.dashboard);

    app.get("/api/examples", function (req, res) {
        db.Example.findAll({}).then(function (dbExamples) {
            res.json(dbExamples);
        });
    });

    // Create a new example
    app.post("/api/examples", function (req, res) {
        db.Example.create(req.body).then(function (dbExample) {
            res.json(dbExample);
        });
    });

    // Delete an example by id
    app.delete("/api/examples/:id", function (req, res) {
        db.Example.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbExample) {
            res.json(dbExample);
        });
    });

    app.get("/logout", authController.logout);

    app.post("/signin", passport.authenticate("local-signin", {
        successRedirect: "/dashboard",
        failureRedirect: "/signin"
    }));

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    };
};