'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('restaurants', 'rating', Sequelize.DECIMAL);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('restaurants', 'rating', Sequelize.INTEGER);
  }
};
