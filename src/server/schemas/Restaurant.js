import GraphQLJSON from 'graphql-type-json';
import db from '../models';
import { Op } from 'sequelize';

export const typeDefs = `
  scalar JSON
  
  type Restaurant {
    id: ID!
    name: String!
    urlName: String!
    rating: Int!
    products: [Product!]
    phone: String
    address: String
    thumbnail: String!
    opening_hours: JSON
    imageUrl: String!
  }
  
  extend type Query {
    restaurantsList (offset: Int, limit: Int): [Restaurant!]
    restaurant (id: ID): Restaurant
  }
`;

export const resolvers = {
  JSON: GraphQLJSON,
  Restaurant: {
    imageUrl: (restaurant) => restaurant.image_url,
    products: (restaurant) => restaurant.getProducts()
  },
  Query: {
    restaurantsList: (_, { offset, limit }) => db.restaurant.findAll({ offset, limit }),
    restaurant: (_, { id }) => db.restaurant.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    })
  }
};