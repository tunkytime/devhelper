var db = require("../models");

module.exports = function (app) {

    // Get all interview questions
    app.get("/api/questions", function (req, res) {
        db.Question.findAll({}).then(function (data) {
            res.json(data);
        });
    });

    // Get all terms
    app.get("/api/terms", function (req, res) {
        db.Term.findAll({}).then(function (data) {
            res.json(data);
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
};