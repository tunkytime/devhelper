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

    app.post("/api/goals", function (req, res) {
        db.Goal.create(req.body).then(function (dbGoal) {
            res.json(dbGoal);
        });
    });

    app.delete("/api/goals/:id", function (req, res) {
        db.Goal.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbGoal) {
            res.json(dbGoal);
        });
    });

    app.put("/api/goals", function (req, res) {
        db.Goal.update({
                text: req.body.text,
                complete: req.body.complete
            }, {
                where: {
                    id: req.user.id
                }
            })
            .then(function (dbGoal) {
                res.json(dbGoal);
            });
    });
};