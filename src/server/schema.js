import { makeExecutableSchema } from 'graphql-tools';
import db from './models';
import { Op } from 'sequelize';

const typeDefs = `
  type Restaurant {
    id: ID!
    name: String!
    rating: Int!
    products: [Product!]
  }
  
  type Product {
    id: ID!
    name: String!
    price: Int!
    restaurant: Restaurant!
  }
  
  type Query {
    restaurantsList: [Restaurant!]
    restaurant (restaurantId: ID): Restaurant
    productsList (restaurantId: ID): [Product]
    product (id: ID): Product
  }
  
  type schema {
    query: Query
  }
`;

const resolvers = {
  Restaurant: {
    products: (restaurant) => restaurant.getProducts()
  },
  Product: {
    restaurant: (product) => product.getRestaurant()
  },
  Query: {
    restaurant: (_, { id }) => db.restaurant.findOne({
      where: {
        [Op.eq]: id
      }
    }),
    product: (_, { id }) => db.restaurant.findOne({
      where: {
        [Op.eq]: id
      }
    }),
    restaurantsList: () => db.restaurant.findAll(),
    productsList: (_, { restaurantId }) => db.product.findAll({
      where: {
        restaurantId: {
          [Op.eq]: restaurantId
        }
      }
    })
  }
};

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});