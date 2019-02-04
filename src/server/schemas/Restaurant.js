import GraphQLJSON from 'graphql-type-json';
import db from '../models';
import { Op } from 'sequelize';
import { shuffle as shuffleSeed } from 'shuffle-seed';

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
    restaurantsList (city: String, offset: Int, limit: Int, tag: String, order: String): [Restaurant!]!
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
    restaurantsList: async (_, {
      city,
      offset,
      limit,
      tag,
      order
    }) => {
      let params = {};

      // Search restaurants containing the tag
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

      console.log('loading for offset=', offset, ', limit=', limit);

      let results = await db.restaurant.findAll({
        offset,
        limit,
        ...params
      });

      // Randomly shuffle restaurants list based
      // on the city name (as a seed). This is to fake that each city has
      // a different list of restaurants
      if (city !== 'undefined') {
        results = shuffleSeed(results, city);
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
