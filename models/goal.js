module.exports = function (sequelize, DataTypes) {
    var Goal = sequelize.define("Goal", {
        title: DataTypes.STRING,
        description: DataTypes.TEXT
    }, {
        timestamps: false
    });
    // Goal.associate = function (models) {
    //     Goal.belongsTo(models.User, {
    //         foreignkey: {
    //             allowNull: false
    //         }
    //     });
    // };
    return Goal;
};