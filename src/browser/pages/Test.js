import React from 'react';
import styled from 'styled-components';
import BaseInput from 'COMPONENTS/Form/BaseInput';
import withValidator from 'HOCS/WithValidator';
import v from 'HELPERS/Validate';
import { createInputHandler } from 'HELPERS';
import BaseForm from 'COMPONENTS/Form/BaseForm';
import BaseButton from 'COMPONENTS/Form/BaseButton';

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
        <BaseForm onSubmit={e => e.preventDefault()}>
          <BaseInput
            name='email'
            value={email}
            onChange={this.updateInput}
            validator={validator}
            validate={v.email}
            placeholder='Your email here'
            style={{ marginRight: '20px' }}
            />
          <BaseInput
            name='password'
            value={password}
            onChange={this.updateInput}
            validator={validator}
            validate={v.password}
            placeholder='Your password here'
            />
          <BaseButton
            disabled={!isFormValid}
            style={{ marginLeft: '20px' }}
            >
            login
          </BaseButton>
        </BaseForm>
      </div>
    );
  }
};

export default withValidator(TestPage);