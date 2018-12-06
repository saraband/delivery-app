import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} from 'graphql';
import db from './models';

const User = new GraphQLObjectType({
  name: 'User',
  description: 'User',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: user => user.id
    },
    name: {
      type: GraphQLString,
      resolve: user => user.username
    },
    password: {
      type: GraphQLString,
      resolve: user => user.password
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email
    }
  })
});

const Restaurant = new GraphQLObjectType({
  name: 'Restaurant',
  description: 'Restaurant',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: restaurant => restaurant.id
    },
    name: {
      type: GraphQLString,
      resolve: restaurant => restaurant.name
    },
    rating: {
      type: GraphQLInt,
      resolve: restaurant => restaurant.rating
    },
    products: {
      type: new GraphQLList(Product),
      resolve: restaurant => restaurant.getProducts()
    }
  })
});

const Product = new GraphQLObjectType({
  name: 'Product',
  description: 'Product',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: product => product.id
    },
    name: {
      type: GraphQLString,
      resolve: product => product.name
    },
    price: {
      type: GraphQLString,
      resolve: product => product.price
    },
    restaurant: {
      type: Restaurant,
      resolve: product => product.getRestaurant()
    }
  })
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => ({
    restaurantsList: {
      type: new GraphQLList(Restaurant),
      args: {
        id: {
          type: GraphQLInt
        },
        name: {
          type: GraphQLString
        }
      },
      resolve: (root, args) => db.restaurant.findAll({ where: args })
    },
    productsList: {
      type: new GraphQLList(Product),
      args: {
        id: {
          type: GraphQLInt
        },
        restaurantId: {
          type: GraphQLInt
        }
      },
      resolve: (root, args) => db.product.findAll({ where: args })
    },
    usersList: {
      type: new GraphQLList(User),
      args: {
        id: {
          type: GraphQLInt
        },
        name: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        }
      },
      resolve: (root, args) => db.product.findAll({ where: args })
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'This is a mutation',
  fields: () => ({
    createUser: {
      type: User,
      args: {
        username: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        }
      },
      resolve: (source, args) => db.user.build({ ...args }).save()
    }
  })
})

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;