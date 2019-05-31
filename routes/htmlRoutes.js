var db = require("../models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("home");
    });

    // Load example page
    app.get("/goals", function (req, res) {
        db.Goal.findAll({}).then(function (dbGoals) {
            res.render("goal", {
                msg: "Welcome!",
                goals: dbGoals
            });
        });
    });

    // Load example page and pass in an example by id
    app.get("/goal/:id", function (req, res) {
        db.Goal.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbGoals) {
            res.render("goal", {
                goal: dbGoals
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