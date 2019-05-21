module.exports = function (sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    //description: DataTypes.TEXT,
    //TRYING TO ADD COMPLETED TO DOS
    completed: DataTypes.BOOLEAN
  });
  return Example;
};