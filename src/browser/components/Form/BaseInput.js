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

// TODO: Old style, recup icon ?
/*
const StyledInput = styled.input`
  border-radius: 2px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #111;
  transition: all 0.15s ease-in-out;

  &:focus,
  &:active {
    box-shadow: 0 0 0 3px ${Colors.LIGHT_BLUE};
    border-color: ${Colors.BLUE};
  }

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
*/

export default class BaseInput extends React.Component {
  constructor (props) {
    super(props);

    // Validate the start value
    const isValid = this.isValueValid(props.validate, props.value);

    this.state = {
      isValid: isValid,
      hasTypedAnythingYet: false,
      errorLabel: ''
    };

    // If a validator is connected, we notify it
    // of the validity of the start value
    if (props.validator) {
      props.validator.onChange({
        name: props.name,
        valid: isValid
      });
    }
  }

  // Pure validate function, used in the constructor
  // and whenever the input changes
  isValueValid = (validate, value) => {

    // Valid until proven otherwise
    let isValid = true;

    // If no validate func is passed,
    // the input is always valid
    if (validate !== undefined) {

      // Multiple validation rules
      if (Array.isArray(validate)) {
        isValid = validate.reduce((areOtherRulesValids, validateFn) => {

          // Check if the array element is a validate function
          // use it if that's the case, ignore otherwise
          return typeof validateFn !== 'function'
            ? areOtherRulesValids
            : areOtherRulesValids && validateFn(value);
        }, true);

        // Single validation rule
      } else {
        isValid = validate(value);
      }
    }

    return isValid;
  }

  // This is called whenever the input value changes
  // (i.e. when native onChange event is called)
  handleChange = (event) => {
    const newValue = event.target.value;
    const name = event.target.name;
    const { validate, validator } = this.props;

    // Check validity of the new value
    const isValid = this.isValueValid(validate, newValue);

    const changeEvent = {
      name,
      value: newValue,
      valid: isValid
    };

    // We trigger the onChange prop
    // TODO: replace this by await
    // TODO: parce que on est pas sur que props.onChange
    // TODO: est defini
    // TODO: et si c'est pas le cas, ça provoquera une erreur
    this.props.onChange(changeEvent).then(() => {

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
    });
  }

  render() {
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
      <div className='input'>
        <input
          onChange={this.handleChange}
          {...rest}
        />
        {!isValid && hasTypedAnythingYet &&
        <label>{errorLabel}</label>
        }
      </div>
    );
  }
};

BaseInput.propTypes = {
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
    onChange: PropTypes.func
  })
};

BaseInput.defaultProps = {
  autoComplete: 'off',
  errorLabel: 'This input is not valid',
  type: 'text',
  // TODO: Replace this by await (props.onChange && props.onChange())
  // TODO: en haut (ligne: 82)
  onChange: () => new Promise(r => r())
};