'use strict';

const Faker = require('faker');

function randomInteger (min, max) {
  return Math.random() * (max - min) + min;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate(
      'restaurants',
      {
        phone: Faker.phone.phoneNumber(),
        address: `${Faker.address.secondaryAddress()}, ${Faker.address.country()}`,
        tags: [5, 28, 42, 3],
        opening_hours: JSON.stringify({
          monday: { from: randomInteger(6, 8), to: randomInteger(18, 23) },
          tuesday: { from: randomInteger(6, 8), to: randomInteger(18, 23) },
          wednesday: { from: randomInteger(6, 8), to: randomInteger(18, 23) },
          thursday: { from: randomInteger(6, 8), to: randomInteger(18, 23) },
          friday: { from: randomInteger(6, 8), to: randomInteger(18, 23) },
          saturday: { from: randomInteger(6, 8), to: randomInteger(18, 23) },
          sunday: { from: randomInteger(6, 8), to: randomInteger(18, 23) }
        })
      },
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate(
      'restaurants',
      {
        phone: null,
        address: null,
        tags: null
      },
      {}
    );
  }
};
