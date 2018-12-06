'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('restaurants', [{
      name: 'Le grand Bleu',
      rating: 8
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('restaurants', null, {});
  }
};
