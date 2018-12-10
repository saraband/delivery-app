/*
 *	BaseInput.js
 *	------------
 *	Custom input that accepts validation rules and can be
 *	connected to a validator.
 *
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import nullFunc from 'MISC/NullFunction';
import Colors from 'CONSTANTS/Colors';
import FontSizes from 'CONSTANTS/FontSizes';
import { validateValue } from 'HELPERS/Validate';

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledInput = styled.input`
  border-radius: 2px;
  padding: 8px 12px 8px 12px;
  font-size: ${FontSizes.MEDIUM};
  border: 1px solid ${Colors.GREY};
  transition: all 0.1s ease-in-out;

  &:focus,
  &:active {
    border-color: ${Colors.DARK_GREY};
    outline: 0;
  }
  
  /* VALID INPUT ? */
  ${p => {
    if (p.showBorder) {
      return p.validBorder
        ? `border-color: ${Colors.BLUE} !important;`
        : `border-color: ${Colors.RED} !important;`;
    }
  }}

  /* ICON */
  ${p => p.icon
    ? `
      background-image: url(${p.icon});
      background-size: auto 100%;
      background-repeat: no-repeat;
      background-position: right center;
    `
    : ''
  }
`;

const Label = styled.label`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 10px;
  font-size: ${FontSizes.SMALL};
  color: ${Colors.RED};
`;

export default class BaseInput extends React.Component {
  constructor (props) {
    super(props);

    // Validate the start value
    const isValid = validateValue(props.validate, props.value);
    this.state = {
      isValid: isValid,
      hasTypedAnythingYet: !!props.value,
      errorLabel: ''
    };

    // If a validator is connected, we notify it
    // of the validity of the start value
    if (props.validator) {
      props.validator.onSubscribe({
        name: props.name,
        validity: isValid
      });
    }
  }

  componentWillUnmount () {
    const {
      name,
      validator
    } = this.props;

    if (validator) {
      validator.onUnsubscribe(name);
    }
  }

  // This is called whenever the input value changes
  // (i.e. when native onChange event is called)
  handleChange = async (event) => {
    const newValue = event.target.value;
    const name = event.target.name;
    const { validate, validator } = this.props;

    // Check validity of the new value
    const isValid = validateValue(validate, newValue);

    const changeEvent = {
      name,
      value: newValue,
      validity: isValid
    };

    // We trigger the onChange prop and wait for it
    if (this.props.onChange) {
      await this.props.onChange(changeEvent);
    }

    // We update the internal validity state of the input
    this.setState({
      isValid,
      hasTypedAnythingYet: true
    }, () => {

      // If the input is connected to a validator,
      // we notify the change so it can update the global
      // validity of the form
      if (validator) {
        validator.onChange(changeEvent);
      }
    });
  };

  render () {
    const {
      // These props are not used but should
      // not be passed down, so we extract them here
      onChange,
      validate,
      validator,

      errorLabel,
      ...rest
    } = this.props;

    const {
      isValid,
      hasTypedAnythingYet
    } = this.state;

    return (
      <Container>
        <StyledInput
          onChange={this.handleChange}
          {...rest}

          // styled-component props
          showBorder={hasTypedAnythingYet}
          validBorder={isValid}
        />
        {!isValid && hasTypedAnythingYet &&
        <Label>{errorLabel}</Label>
        }
      </Container>
    );
  }
};

BaseInput.propTypes = {
  icon: PropTypes.string,
  autoComplete: PropTypes.string,
  errorLabel: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  validate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.PropTypes.arrayOf([PropTypes.func])
  ]),
  validator: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onSubscribe: PropTypes.func.isRequired,
    onUnsubscribe: PropTypes.func.isRequired
  })
};

BaseInput.defaultProps = {
  autoComplete: 'off',
  errorLabel: 'This input is not valid',
  type: 'text'
};