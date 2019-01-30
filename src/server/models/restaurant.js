'use strict';
module.exports = (sequelize, DataTypes) => {
  const restaurant = sequelize.define('restaurant', {
    name: DataTypes.STRING,
    rating: DataTypes.DECIMAL,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    tags: DataTypes.ARRAY(DataTypes.STRING),
    thumbnail: DataTypes.TEXT,
    opening_hours: DataTypes.JSON,
    image_url: DataTypes.STRING,
    urlName: DataTypes.STRING
  }, {});
  restaurant.associate = function (models) {
    restaurant.hasMany(models.product);
  };
  return restaurant;
};