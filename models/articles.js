module.exports = (sequelize, DataTypes) => {
    var Articles = sequelize.define('articles', {
        
        title: DataTypes.STRING,
        url: DataTypes.STRING,
        image: DataTypes.STRING,
        },
        {
            timestamps: false
        });
        Articles.associate = function(models) {
            Articles.belongsTo(models.user, {
                foreignkey: {
                    allowNull: false
                }
            });
        };
    return Articles;
};