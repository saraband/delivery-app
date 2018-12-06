'use strict';
module.exports = (sequelize, DataTypes) => {
  const restaurant = sequelize.define('restaurant', {
    name: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  restaurant.associate = function(models) {
    restaurant.hasMany(models.product);
  };
  return restaurant;
};