module.exports = function (sequelize, DataTypes) {
    var Next = sequelize.define("Next", {
        text: DataTypes.STRING,
        complete: DataTypes.BOOLEAN,
    }, {
        timestamps: false
    });
    Next.associate = function (models) {
        Next.belongsTo(models.User, {
            foreignkey: {
                allowNull: false
            }
        });
    };
    return Next;
};