export const typeDefs = `
  extend type Query {
    tagsList: [String!]!
  }
`;

export const resolvers = {
  Query: {
    // TODO: tags list needs to be constant somewhere
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
