'use strict';
module.exports = (sequelize, DataTypes) => {
  const restaurant = sequelize.define('restaurant', {
    name: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    tags: DataTypes.ARRAY(DataTypes.INTEGER),
    thumbnail: DataTypes.TEXT,
    opening_hours: DataTypes.JSON
  }, {});
  restaurant.associate = function(models) {
    restaurant.hasMany(models.product);
  };
  return restaurant;
};