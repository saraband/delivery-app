import fs from 'fs';
import path from 'path';
import merge from 'lodash/merge';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = [`
  type Query {
    _empty: String
  }
  
  type Mutation {
    _empty: String
  }

  type schema {
    query: Query
    mutation: Mutation
  }
`];

/**
 *  Merge all typeDefs and resolvers to build schema
 */
const modules = fs.readdirSync(__dirname)
  .filter((filename) => filename !== 'index.js')
  .map((module) => require(path.resolve(__dirname, module)));

export default makeExecutableSchema({
  resolvers: merge(...modules.map((module) => module.resolvers)),
  typeDefs: typeDefs.concat(modules.map((module) => module.typeDefs))
});
