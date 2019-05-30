module.exports = function (sequelize, DataTypes) {
    var Question = sequelize.define("Question", {
        question: DataTypes.STRING,
        answer: DataTypes.TEXT
    }, {
        timestamps: false
    });
    return Question;
};