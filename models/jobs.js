module.exports = (sequelize, DataTypes) => {
    var Job = sequelize.define('Job', {
        title: DataTypes.STRING,
        category: DataTypes.STRING,
        field: DataTypes.STRING,
        url: DataTypes.STRING,
        
    }, {
        timestamps: false
    });
   
    return Job;
};