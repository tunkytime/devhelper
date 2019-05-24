module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING,
            notEmpty: true
        },

        lastname: {
            type: DataTypes.STRING,
            notEmpty: true
        }
    });

    // User.associate = models => {
    //     models.User.hasMany(models.Goal, {
    //         onDelete: "CASCADE",
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return User;
};