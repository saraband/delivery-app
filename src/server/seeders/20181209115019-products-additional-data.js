'use strict';

const Faker = require('faker');

function randomInteger (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const tags = [
  'Tomato',
  'Onions',
  'Beef',
  'Chicken',
  'Lettuce',
  'Mozzarella',
  'Cheese',
  'Flour',
  'Bread',
  'Paprika',
  'Fish',
  'Milk'
];

function generateRandomIngredients () {
  let list = [];
  const size = randomInteger(3, 8);

  do {
    list.push(tags[randomInteger(0, tags.length - 1)]);
    list = Array.from(new Set(list));
  } while (list.length < size);

  return list;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = await queryInterface.sequelize.query(`SELECT * FROM public.products`);

    return Promise.all(products[0].map((product) => {
      return queryInterface.bulkUpdate(
        'products',
        {
          description: Faker.lorem.sentence(),
          ingredients: generateRandomIngredients()
        },
        {
          id: {
            [Sequelize.Op.eq]: product.id
          }
        }
      );
    }));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkUpdate(
      'products',
      {
        description: null,
        ingredients: null
      },
      {}
    );
  }
};