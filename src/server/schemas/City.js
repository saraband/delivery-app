import { remove as removeDiacritics } from 'diacritics';

/* we restructure the cities */
const worldCities = require('../data/world-cities').map(city => ({
  id: city.geonameid,
  name: city.name,
  country: city.country,
  asciiName: removeDiacritics(city.name)
}));

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
    /*  TODO: rename this query (searchCity ?)
     *  TODO: search for country also
     *  TODO: search through special chars
     */
    citiesList: (_, { filter }) => {
      console.log('==>', removeDiacritics(filter))
      const results = [];
      const regex = new RegExp(removeDiacritics(filter), 'i');

      for (let city of worldCities) {
        const match = regex.exec(city.asciiName);

        // if the city name matches the filter,
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

      return results;
    },
  }
};