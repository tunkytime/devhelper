var db = require("../models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("example", {
            quote: "This is a random quote",
            image: "https://www.growthgurus.com/wp-content/uploads/2018/07/ico-websites-background-placeholder-image.jpg"
        });
    });

    // Load example page
    app.get("/dashboard", function (req, res) {
        db.Example.findAll({}).then(function (dbExamples) {
            res.render("dashboard", {
                msg: "Welcome!",
                examples: dbExamples
            });
        });
    });

    // Load example page and pass in an example by id
    app.get("/dashboard/:id", function (req, res) {
        db.Example.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbExample) {
            res.render("dashboard", {
                example: dbExample
            });
        });
    });

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
        res.render("404");
    });
};