'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  product.associate = function(models) {
    product.belongsTo(models.restaurant);
  };
  return product;
};