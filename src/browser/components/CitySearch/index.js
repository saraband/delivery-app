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

class CitySearch extends React.Component {
  render () {
    const {
      className,
      value,
      history
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
              const { data } = await client.query({
                query: GET_CITIES_LIST,
                variables: { filter }
              });

              /* we restructure the data to fit SearchInput requirements */
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
              // We retrieve the city name (The value might be City, Country)
              const city = value.split(',')[0];

              // Push to the restaurant list of this city
              history.push(addParamsToUrl(Routes.RESTAURANTS_LIST, { city }))
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