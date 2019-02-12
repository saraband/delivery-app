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
    description: String!
  }
  
  extend type Query {
    restaurantsCount (city: String, tag: String): Int!
    restaurantsList (city: String, offset: Int, limit: Int, tag: String, order: String): [Restaurant!]!
    restaurant (id: ID): Restaurant
  }
  
  extend type Mutation {
    sendOrder (params: String): String
  }
`;

function getRestaurantSearchParams (city, tag) {
  let params = {};

  // Search restaurants containing the tag
  if (tag !== undefined) {
    params = {
      where: {
        tags: {
          [Op.contains]: [tag.toLowerCase()]
        }
      }
    }
  }

  /**
   *  The `city` parameter is not used here since it's always the same restaurants list
   *  for every city, we just shuffle it to fake that every city has a different list.
   *  Buut in the future, we would process the city param here
   */

  return params;
}

export const resolvers = {
  JSON: GraphQLJSON,
  Restaurant: {
    imageUrl: (restaurant) => restaurant.image_url,
    products: (restaurant) => restaurant.getProducts()
  },
  Mutation: {
    sendOrder: (_, { params }) => {
      /**
       * Do something with params here (params.firstName, params.ccv, etc)
       */
      const {
        ccv,
        firstName,
        lastName
        // ...rest of the order details
      } = JSON.parse(params);

      return 'OK'
    }
  },
  Query: {
    restaurantsCount: (_, { city, tag }) => {
      return db.restaurant.count({
        ...getRestaurantSearchParams(city, tag)
      });
    },
    restaurantsList: async (_, {
      city,
      offset,
      limit,
      tag,
      order
    }) => {

      // Query the DB
      let results = await db.restaurant.findAll({
        /*
        offset,
        limit,
         */
        ...getRestaurantSearchParams(city, tag)
      });

      /**
       *  Randomly shuffle restaurants list based
       *  on the city name (as a seed). This is to fake that each city has
       *  a different list of restaurants
       */
      if (city !== 'undefined') {
        results = shuffleSeed(results, city);
      }

      /**
       *  offset and limit
       *  This is suboptimal as we need to keep in memory the whole list
       but in this case - since we fake that each city has a different list of restaurants
       by randomly shuffling the list - we need to slice after shuffling. Otherwise
       it would give a different shuffling result and would fuck up the offset and limit given
       that is used for infinite scrolling

       In a production case where I really have restaurants affiliated to cities, I would pass
       offset and limit in the SQL query as shown in the comment inside the query above
       */
      return results.slice(offset, limit);
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
