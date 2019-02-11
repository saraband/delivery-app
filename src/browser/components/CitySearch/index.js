/**
 * SearchInput to search a city. Gets the user
 * in the Restaurant listing page of the corresponding city
 * on submit
 */

import React from 'react';
import SearchInput from 'COMPONENTS/Form/SearchInput';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { addParamsToUrl } from 'ROUTES';
import Routes from 'ROUTES';

const GET_CITIES_LIST = gql`
 query autoCompleteCities ($filter: String) {
    citiesList (filter: $filter) {
      city {
        id
        name
        country
      }
      matchStartIndex
      matchEndIndex
    }
  }
`;

class CitySearch extends React.PureComponent {
  render () {
    const {
      className,
      value,
      history,
      location
    } = this.props;

    return (
      <ApolloConsumer>
        {(client) => (
          <SearchInput
            name='city'
            value={value}
            className={className}
            placeholder='Search a city...'
            searchFunction={async (filter) => {
              // Empty filter
              if (!filter.trim()) return [];

              const { data } = await client.query({
                query: GET_CITIES_LIST,
                variables: { filter: filter.trim() }
              });

              // we restructure the data to fit SearchInput requirements
              return data.citiesList.map((match) => ({
                id: match.city.id,
                value: `${match.city.name}, ${match.city.country}`,
                highlight: {
                  from: match.matchStartIndex,
                  to: match.matchEndIndex
                }
              }));
            }}
            onSubmit={(value) => {
              // If there is no value, redirects to /list/all
              // Otherwise, we retrieve the city name and redirects to /list:city
              const city = !value.trim()
                ? 'all'
                : value.split(',')[0];

              // Push to the restaurant list of this city
              // and preserve tags if they exist (query string parameters)
              history.push(`${addParamsToUrl(Routes.RESTAURANTS_LIST, { city })}${location.search}`);
            }}
          />
        )}
      </ApolloConsumer>
    );
  }
};

export default withRouter(CitySearch);

CitySearch.propTypes = {
  value: PropTypes.string
};

CitySearch.defaultProps = {
  value: ''
};
