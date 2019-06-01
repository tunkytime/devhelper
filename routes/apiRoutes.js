var db = require("../models");

module.exports = function (app) {

    app.get("/api/questions", function (req, res) {
        db.Question.findAll({}).then(function (data) {
            res.json(data);
        });
    });

    app.get("/api/terms", function (req, res) {
        db.Term.findAll({}).then(function (data) {
            res.json(data);
        });
    });
};