import React from 'react';
import SearchInput from 'COMPONENTS/Form/SearchInput';
import Loader from 'COMPONENTS/Loader';
import Placeholder from 'COMPONENTS/Placeholder';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { ApolloConsumer, ApolloProvider } from 'react-apollo';
import BaseButton, {ButtonTypes} from 'COMPONENTS/Form/BaseButton';
import FontSizes from 'CONSTANTS/FontSizes';

const Container = styled(Placeholder)`
  width: 300px;
  height: 200px;
  border-radius: 5px;
`;

const GET_CITIES_LIST = gql`
 query autoCompleteCities ($name: String) {
    citiesList (name: $name) {
      id
      name
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

class TestPage extends React.Component {
  render () {
    return (
      <ApolloConsumer>
        {(client) => (
          <div>
            <SearchInput
              name='zipCode'
              value='Toulouse'
              placeholder='City, state, ZIP code...'
              searchFunction={async (value) => {
                const { data } = await client.query({
                  query: GET_CITIES_LIST,
                  variables: { name: value }
                });

                return data.citiesList.map((city) => ({
                  id: city.id,
                  value: city.name
                }));
              }}
              onSubmit={(value) => {
                console.log('SEARCHING city = ' + value)
              }}
              />
            <Button>Click me</Button>
          </div>
        )}
      </ApolloConsumer>
    );
  }
};

export default TestPage
