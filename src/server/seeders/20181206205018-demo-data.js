'use strict';

const Faker = require('faker');

function randomRating () {
  return Math.ceil(Math.random() * 100) / 10;
}

function randomPrice () {
  return Math.ceil(Math.random() * 30) + 5 + (Math.random() < .5 ? 0.5 : 0);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert(
      'restaurants',
      new Array(100).fill(1).map(() => ({
        name: Faker.company.companyName(),
        rating: randomRating(),
        createdAt: new Date(),
        updatedAt: new Date()
      })),
      {}
    );

    const restaurants = await queryInterface.sequelize.query(`SELECT * FROM public.restaurants`);

    return Promise.all(restaurants[0].map(restaurant => {
      return queryInterface.bulkInsert(
        'products',
        new Array(25).fill(1).map(() => ({
          name: Faker.commerce.productName(),
          restaurantId: restaurant.id,
          price: randomPrice(),
          createdAt: new Date(),
          updatedAt: new Date()
        })),
        {}
      );
    }));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('restaurants', null, {});
    await queryInterface.bulkDelete('products', null, {});
  }
};
