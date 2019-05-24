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
    app.post("/api/goals", function (req, res) {
        db.Example.create(req.body).then(function (dbGoal) {
            res.json(dbGoal);
        });
    });

    app.get("/api/goals", function (req, res) {
        db.Goal.findAll({}).then(function (dbGoal) {
            res.json(dbGoal);
        });
    });

    // db.Example.bulkCreate([{
    //         text: "First Example",
    //         description: "First Description"
    //     },
    //     {
    //         text: "Second Example",
    //         description: "Second Description"
    //     }
    // ])

    // Delete an example by id
    app.delete("/api/goals/:id", function (req, res) {
        db.Goal.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbGoal) {
            res.json(dbGoal);
        });
    });
};