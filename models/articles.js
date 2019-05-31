module.exports = (sequelize, DataTypes) => {
    var Article = sequelize.define('Article', {
        title: DataTypes.STRING,
        url: DataTypes.STRING,
        image: DataTypes.STRING,
    }, {
        timestamps: false
    });
    Article.associate = function (models) {
        Article.belongsTo(models.User, {
            foreignkey: {
                allowNull: false
            }
        });
    };
    return Article;
};