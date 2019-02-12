export const typeDefs = `
  extend type Query {
    tagsList: [String!]!
  }
`;

export const resolvers = {
  Query: {
    /**
     *  This would be dynamically computed as new restaurants and tags
     *  get added in the database.
     */
    tagsList: () => [
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
    ]
  }
}
