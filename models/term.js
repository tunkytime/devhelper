module.exports = function (sequelize, DataTypes) {
    var Term = sequelize.define("Term", {
        term: DataTypes.STRING,
        answer: DataTypes.TEXT
    });
    return Term;
};