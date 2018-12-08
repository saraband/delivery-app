'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    ingredients: DataTypes.ARRAY(DataTypes.STRING)
  }, {});
  product.associate = function(models) {
    product.belongsTo(models.restaurant);
  };
  return product;
};