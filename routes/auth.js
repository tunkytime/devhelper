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

    app.get("/logout", authController.logout);

    app.post("/signin", passport.authenticate("local-signin", {
        successRedirect: "/dashboard",
        failureRedirect: "/signin"
    }));

    app.get("/articles", isLoggedIn, function (req, res) {
        db.Article.findAll({
            where: {
                userId: req.user.id
            }
        }).then(function (dbarticles) {
            var articleobj = {
                articles: dbarticles
            }
            res.render("articles", articleobj);
            console.log("All articles have been retrieved");
            console.log(dbarticles);
        });
    });

    app.post("/articles", isLoggedIn, function (req, res) {
        db.Article.create(req.body).then(function (dbarticles) {
            console.log("Saved Article:");
            console.log(dbarticles.dataValues.title);
            console.log("id:  ------------------------------------------------------------------>");
            console.log(dbarticles.dataValues.id);
            console.log("User id:  ------------------------------------------------------------->");
            console.log(dbarticles.dataValues.userId);
            console.log("url:  ----------------------------------------------------------------->");
            console.log(dbarticles.dataValues.url);
            console.log("image:  --------------------------------------------------------------->");
            console.log(dbarticles.dataValues.image);
        });
    });

    app.delete("/articles/:id", function (req, res) {
        console.log("deleting......");
        db.Article.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbarticles) {
            db.Article.findAll({}).then(function (dbarticles) {
                var articleobj = {
                    articles: dbarticles
                }
                res.render("articles", articleobj);
                console.log("All articles have been retrieved");
                console.log(dbarticles);
            });
        });
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    };
};