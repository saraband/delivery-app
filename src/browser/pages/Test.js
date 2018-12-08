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
        <div
          style={{
            width: '300px',
            height: '300px',
            overflow: 'hidden'
          }}
          >
          <img src='data:image/jpeg;base64,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'
            style={{
              width: '320px',
              height: '320px',
              filter: 'blur(10px)',
              marginTop: '-10px',
              marginLeft: '-10px'
            }}
            />
        </div>
      </div>
    );
  }
};

export default withValidator(TestPage);