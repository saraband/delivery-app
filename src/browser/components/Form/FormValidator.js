/*
 *	FormValidator.js
 *	------------
 *  Provides a validator to the children components. The children can
 *  then subscribe to the validator, which will allow the validator
 *  to know when the form is valid and notify them
 */

import React from 'react';
import PropTypes from 'prop-types';

export default class FormValidator extends React.Component {
  constructor (props) {
    super(props);

    this.formDataValidity = {};
    this.state = {
      isFormValid: false
    };
  }

  handleValidityChange = ({ name, validity }) => {
    this.formDataValidity[name] = validity;
    this.setState({
      isFormValid: Object.keys(this.formDataValidity).reduce((areOtherFieldsValid, currentKey) => {
        return areOtherFieldsValid && this.formDataValidity[currentKey];
      }, true)
    });
  };

  handleSubscribe = ({ name, validity }) => {
    if (this.formDataValidity[name] !== undefined) {
      console.error(`FormValidator warning: name \`${name}\` is already taken by another input.`);
    }

    this.handleValidityChange({ name, validity });
  };

  handleUnsubscribe = (name) => {
    delete this.formDataValidity[name];
  };

  render () {
    return this.props.children({
      isFormValid: this.state.isFormValid,
      validator: {
        onChange: this.handleValidityChange,
        onSubscribe: this.handleSubscribe,
        onUnsubscribe: this.handleUnsubscribe
      }
    });
  }
}

FormValidator.propTypes = {
  children: PropTypes.func.isRequired
};