module.exports = function (sequelize, DataTypes) {
    var Question = sequelize.define("Question", {
        question: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        answer: {
            type: DataTypes.STRING,
            notEmpty: true
        },
    });
    return Question;
};