import GraphQLJSON from 'graphql-type-json';
import db from '../models';
import { Op } from 'sequelize';

export const typeDefs = `
  scalar JSON
  
  type Restaurant {
    id: ID!
    name: String!
    urlName: String!
    rating: Float!
    products: [Product!]!
    phone: String
    address: String
    thumbnail: String
    opening_hours: JSON
    imageUrl: String!
    tags: [String!]!
  }
  
  extend type Query {
    restaurantsList (offset: Int, limit: Int, tag: String, city: String): [Restaurant!]
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
    restaurantsList: async (_, { offset, limit, tag, city }) => {
      let params = {};

      // search restaurants containing the tag
      if (tag !== undefined) {
        params = {
          where: {
            tags: {
              // TODO: this is not optimal (shoudl be case insensitive)
              [Op.contains]: [tag.substring(0, 1).toUpperCase() + tag.substring(1)]
            }
          }
        }
      }

      const results = await db.restaurant.findAll({
        offset,
        limit,
        ...params
      });

      // sort the city list to be different according to the city
      // TODO: random based on city hash seed
      if (city !== undefined) {
        results.sort(() => Math.random() - 0.5);
      }

      return results;
    },
    restaurant: (_, { id }) => db.restaurant.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    })
  }
};
