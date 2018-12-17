import db from '../models';
import { Op } from 'sequelize';

export const typeDefs = `
  type Product {
    id: ID!
    name: String!
    price: Int!
    restaurant: Restaurant!
    description: String,
    ingredients: [String]
  }
  
  extend type Query {
    productsList (restaurantId: ID): [Product]
    product (id: ID): Product
  }
`;

export const resolvers = {
  Product: {
    restaurant: (product) => product.getRestaurant()
  },
  Query: {
    productsList: (_, { restaurantId }) => db.product.findAll({
      where: {
        restaurantId: {
          [Op.eq]: restaurantId
        }
      }
    }),
    product: (_, { id }) => db.restaurant.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    })
  }
};