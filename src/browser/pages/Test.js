import React from 'react';
import styled from 'styled-components';
import BaseInput from 'COMPONENTS/Form/BaseInput';
import withValidator from 'HOCS/WithValidator';
import v from 'HELPERS/Validate';
import { createInputHandler } from 'HELPERS';

class TestPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      formData: {
        email: '',
        password: ''
      }
    };

    this.updateInput = createInputHandler({ stateKey: 'formData' }).bind(this);
  }
  render () {
    const {
      isFormValid,
      validator
    } = this.props;

    const {
      email,
      password
    } = this.state.formData;

    return (
      <div>
        <form onSubmit={e => e.preventDefault()}>
          <BaseInput
            name='email'
            value={email}
            onChange={this.updateInput}
            validator={validator}
            validate={v.email}
            placeholder='Your email here'
            />
          <BaseInput
            name='password'
            value={password}
            onChange={this.updateInput}
            validator={validator}
            validate={v.password}
            placeholder='Your password here'
            />
          <button disabled={!isFormValid}>login</button>
          valid={isFormValid ? 'true' :'false'}
        </form>
      </div>
    );
  }
};

export default withValidator(TestPage);