module.exports = (sequelize, DataTypes) => {
    var Question = sequelize.define('question', {
        question: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        answer: {
            type: DataTypes.STRING,
            notEmpty: true
        }
    });
    return Question;
}