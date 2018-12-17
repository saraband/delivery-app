export const typeDefs = `
  type User {
    username: String!
    email: String!
  }
  
  extend type Query {
    self: User
  }
`;

export const resolvers = {
  Query: {
    self: () => ({
      username: 'Jane Doe',
      email: 'jane.doe@mail.com'
    })
  }
};