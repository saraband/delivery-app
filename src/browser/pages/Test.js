import React from 'react';
import SearchInput from 'COMPONENTS/Form/SearchInput';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { ApolloConsumer, ApolloProvider } from 'react-apollo';
import BaseButton, {ButtonTypes} from 'COMPONENTS/Form/BaseButton';
import FontSizes from 'CONSTANTS/FontSizes';
import FlatSelect from 'COMPONENTS/FlatSelect';
import { withRouter } from 'react-router-dom';
import Tutorial from 'COMPONENTS/Tutorial';

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

const Button = styled(BaseButton).attrs({
  type: ButtonTypes.FULL
})`
  margin-top: 20px;
  width: 400px;
  height: 50px;
  font-size: ${FontSizes.BIG};
`;

const options = new Array(20).fill(1).map((_, index) => ({
  id: index,
  value: `Option ${index}`
}));

console.log(options)

class TestPage extends React.Component {
  render () {
    // TODO: this needs to be split more :(
    return (
      <ApolloConsumer>
        {(client) => (
          <div>
            <SearchInput
              name='zipCode'
              value='Toulouse'
              placeholder='City, state, country'
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
                console.log('SEARCHING city = ' + value)
              }}
              />
          </div>
        )}
      </ApolloConsumer>
    );
  }
};

export default withRouter(TestPage)
