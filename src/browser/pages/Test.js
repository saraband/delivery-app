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
      email: '',
      password: ''
    };
  }

  render () {
    const {
      isFormValid,
      validator
    } = this.props;
    return (
      <div>
        <BaseForm>
          <BaseInput
            name='email'
            value={this.state.email}
            onChange={this.updateInput}
            validator={validator}
            validate={v.email}
            />
          <BaseInput
            name='password'
            type='password'
            value={this.state.password}
            onChange={this.updateInput}
            validator={validator}
            validate={v.password}
            />
          <BaseButton disabled={!isFormValid}>Submit</BaseButton>
        </BaseForm>
      </div>
    );
  }
};

export default withValidator(TestPage);
