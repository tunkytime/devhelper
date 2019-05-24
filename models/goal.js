module.exports = (sequelize, DataTypes) => {
    var Goal = sequelize.define("Goal", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        created_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updated_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        }
    });

    // Goal.associate = (models) => {
    //     Goal.belongsTo(models.User, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return Goal;
};