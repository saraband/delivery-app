import React from 'react';
import styled from 'styled-components';
import AutoCompleteInput from 'COMPONENTS/Form/AutoCompleteInput';
import { createInputHandler } from 'HELPERS';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const GET_CITIES = gql`
  query autoCompleteCities ($name: String!) {
    citiesList (name: $name) {
      id
      name
    }
  }
`;
/*
  <ApolloConsumer>
        {(client) => (
          <AutoCompleteInput
            searchFunction={async (value) => {
              const { data } = await client.query({
                query: GET_CITIES,
                variables: { name: value }
              });

              return data.citiesList;
            }}
            debounce={500}
            onChange={this.updateInput}
            value={city}
            name='city'
          />
        )}
      </ApolloConsumer>
      */

import Input from 'COMPONENTS/Form/BaseInput';
import Validator from 'COMPONENTS/Form/Validator';
import v from 'HELPERS/Validate';
import BaseButton from 'COMPONENTS/Form/BaseButton';

class TestPage extends React.Component {
  constructor (props) {
    super(props);

    this.updateInput = createInputHandler().bind(this);
    this.state = {
      city: ''
    };
  }

  render () {
    const {
      city
    } = this.state;

    return (
      <Validator>
        {({ isFormValid, validator }) => {
          return (
            <div>
						  <Input
                name='email'
                validator={validator}
                validate={v.email}
                />
						  <Input
                name='password'
                validator={validator}
                validate={v.password}
                />
              <BaseButton disabled={!isFormValid}>Submit</BaseButton>
            </div>
          )
				}}
      </Validator>
    );
  }
};

export default TestPage;
