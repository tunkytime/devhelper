module.exports = function (sequelize, DataTypes) {
    var Goal = sequelize.define("Goal", {
        text: DataTypes.STRING,
        complete: DataTypes.BOOLEAN,
    }, {
        timestamps: false
    });
    Goal.associate = function (models) {
        Goal.belongsTo(models.User, {
            foreignkey: {
                allowNull: false
            }
        });
    };
    return Goal;
};