import { remove as removeDiacritics } from 'diacritics';
import escapeStringRegexp from 'escape-string-regexp';
import { compose } from 'redux';
import Dictionary from '../Dictionary';

/**
 *  We compute the ASCII name of each city so we can
 *  search on it later
 * */
const worldCities = require('../data/world-cities').map(city => ({
  id: city.geonameid,
  name: city.name,
  country: city.country,
  asciiName: removeDiacritics(city.name).toLowerCase()
}));

// Create a dictionary that will allow us to search efficiently
const citiesDictionary = new Dictionary(
  worldCities,
  (city) => city.asciiName
);

export const typeDefs = `
  type City {
    id: ID!
    name: String!
    country: String!
  }
  
  type CityMatch {
    city: City!
    matchStartIndex: Int!
    matchEndIndex: Int!
  }
  
  extend type Query {
    citiesList (filter: String): [CityMatch]
  }
`;

export const resolvers = {
  Query: {
    citiesList: (_, { filter }) => {
      const then = Date.now();
      const escape = compose(
        removeDiacritics,
        escapeStringRegexp,
        (str) => str.toLowerCase()
      );

      const results = citiesDictionary.lookup(escape(filter)).map((city) => ({
        city,
        matchStartIndex: 0, // TODO!!! matchIndex
        matchEndIndex: 5
      }));
      
      console.log(`Search for \`${filter}\` executed in ${(Date.now() - then) / 1000}s`);
      return results;
    },
  }
};
