import fs from 'fs';
import path from 'path';
import merge from 'lodash/merge';
import { makeExecutableSchema } from 'graphql-tools';
import City from './City';
import Product from './Product';
import Restaurant from './Restaurant';
import Tags from './Tags';
import User from './User';

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
/*
const modules = fs.readdirSync(__dirname)
  .filter((filename) => filename !== 'index.js')
  .map((module) => require(`./${module}`));*/

const modules = [
  City,
  Product,
  Restaurant,
  Tags,
  User
];

export default makeExecutableSchema({
  resolvers: merge(...modules.map((module) => module.resolvers)),
  typeDefs: typeDefs.concat(modules.map((module) => module.typeDefs))
});
