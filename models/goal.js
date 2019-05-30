module.exports = function (sequelize, DataTypes) {
    var Goal = sequelize.define("Goal", {
        title: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {
        timestamps: false
    });
    return Goal;
};