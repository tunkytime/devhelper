var db = require("../models");
var callQuoteAPI = require("../controllers/api");

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("home", {
            quote: "This is a random quote",
            image: "https://www.growthgurus.com/wp-content/uploads/2018/07/ico-websites-background-placeholder-image.jpg"
        });
    });

    // Load example page
    app.get("/example", function (req, res) {
        db.Example.findAll({}).then(function (dbExamples) {
            res.render("example", {
                msg: "Welcome!",
                examples: dbExamples
            });
        });
    });

    // Load example page and pass in an example by id
    app.get("/example/:id", function (req, res) {
        db.Example.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbExample) {
            res.render("example", {
                example: dbExample
            });
        });
    });
    app.get("/quote", function (req, res) {
        callQuoteAPI.callQuoteAPI(function(res){
            res.write(JSON.stringify(res));
        })
    })
    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
        res.render("404");
    });
};