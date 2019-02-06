import { remove as removeDiacritics } from 'diacritics';
import escapeStringRegexp from 'escape-string-regexp';
import { compose } from 'redux';

/* We compute the ASCII name of each city so we can
   search on it later
   */
const worldCities = require('../data/world-cities').map(city => ({
  id: city.geonameid,
  name: city.name,
  country: city.country,
  asciiName: removeDiacritics(city.name)
}));

console.log(worldCities[worldCities.length - 1].asciiName)

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
      const results = [];
      const escape = compose(removeDiacritics, escapeStringRegexp);
      const regex = new RegExp(escape(filter), 'i');

      for (let city of worldCities) {
        const match = regex.exec(city.asciiName);

        // If the city name matches the filter,
        // we add it as a CityMatch type to the results
        if (match) {
          results.push({
            city,
            matchStartIndex: match.index,
            matchEndIndex: match.index + filter.length
          });

          // Enough results
          if (results.length >= 5) {
            break;
          }
        }
      }

      console.log(`Search for \`${filter}\` executed in ${(Date.now() - then) / 1000}s`);

      return results;
    },
  }
};
