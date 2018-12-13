import React from 'react';
import styled from 'styled-components';
import AutoCompleteInput from 'COMPONENTS/Form/AutoCompleteInput';
import { createInputHandler } from 'HELPERS';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import FormValidator from 'COMPONENTS/Form/FormValidator';
import BaseForm from 'COMPONENTS/Form/BaseForm';
import BaseInput from 'COMPONENTS/Form/BaseInput';
import v from 'HELPERS/Validate';
import BaseButton from 'COMPONENTS/Form/BaseButton';
import withValidator from 'HOCS/WithValidator';
import Loader from '../components/Loader';
import { ButtonTypes } from '../components/Form/BaseButton';

const GET_CITIES = gql`
  query autoCompleteCities ($name: String!) {
    citiesList (name: $name) {
      id
      name
    }
  }
`;

class TestPage extends React.Component {
  constructor (props) {
    super(props);

    this.updateInput = createInputHandler().bind(this);
    this.state = {
      email: 'dgsdf@qsdfq.com',
      password: 'qs2dfsdq2f8qsdf25',
      unmounted: false
    };
  }

  render () {
    return (
      <FormValidator>
        {({ isFormValid, validator }) => (
          <BaseForm>
            <BaseButton
              type={ButtonTypes.FULL}
              color='#F012BE'
            >
              Submit
            </BaseButton>
            <BaseButton
              type={ButtonTypes.BORDERED}
              color='#F012BE'
            >
              Submit
            </BaseButton>
            <BaseButton
              type={ButtonTypes.EMPTY}
              color='#F012BE'
            >
              CLEAR
            </BaseButton>
          </BaseForm>
        )}
      </FormValidator>
    );
  }
};

export default TestPage
