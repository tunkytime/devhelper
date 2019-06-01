module.exports = function (sequelize, DataTypes) {
    var Build = sequelize.define("Build", {
        text: DataTypes.STRING,
        complete: DataTypes.BOOLEAN,
    }, {
        timestamps: false
    });
    Build.associate = function (models) {
        Build.belongsTo(models.User, {
            foreignkey: {
                allowNull: false
            }
        });
    };
    return Build;
};