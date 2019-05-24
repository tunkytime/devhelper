module.exports = function (sequelize, DataTypes) {
    var Term = sequelize.define("term", {
        term: DataTypes.STRING,
        definition: DataTypes.TEXT
    });
    return Term;
};