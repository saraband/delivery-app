'use strict';

const Faker = require('faker');

function randomInteger (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const tags = [
  'Chinese',
  'Burger',
  'Healthy',
  'Vegan',
  'Pizza',
  'Italian',
  'African',
  'Chicken',
  'Indian',
  'Thai',
  'Sushi',
  'Asian'
];

function generateRandomTags () {
  let list = [];
  const size = randomInteger(3, 6);

  do {
    list.push(tags[randomInteger(0, tags.length - 1)]);
    list = Array.from(new Set(list));
  } while (list.length < size);

  return list;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const restaurants = await queryInterface.sequelize.query(`SELECT * FROM public.restaurants`);

    return Promise.all(restaurants[0].map((restaurant) => {
      return queryInterface.bulkUpdate(
        'restaurants',
        {
          phone: Faker.phone.phoneNumber(),
          address: `${Faker.address.secondaryAddress()}, ${Faker.address.country()}`,
          tags: generateRandomTags(),
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
        {
          id: {
            [Sequelize.Op.eq]: restaurant.id
          }
        }
      );
    }));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate(
      'restaurants',
      {
        opening_hours: null,
        phone: null,
        address: null,
        tags: null
      },
      {}
    );
  }
};
