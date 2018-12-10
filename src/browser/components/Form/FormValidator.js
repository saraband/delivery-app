/*
 *	FormValidator.js
 *	------------
 *  Provides a validator to the children components. The children can
 *  then subscribe to the validator, which will allow the validator
 *  to know when the form is valid and notify them
 *
 *  TODO: Maybe add a static counter to segment validators in case
 *  TODO: there are multiple validator with the same input names ?
 */

import React from 'react';
import PropTypes from 'prop-types';

export default class FormValidator extends React.Component {
  constructor (props) {
    super(props);

    this.validatingQueue = [];
    this.validatingPromise;
    this.state = {
      isFormValid: false,
      formDataValidity: {}
    };
  }

  // We pass this function as a prop
  // so inputs that wish to subscribe to this validator
  // use it and let the validator know when the form
  // is valid
  handleFormChange = async (validatingEvent) => {

    // We push the validating event into the queue
    // so we don't validate at the same time and we
    // keep the chain of validating event linear
    this.validatingQueue.push(validatingEvent);

    // If something is validating, wait till it's finished
    if (this.validatingPromise) {
      await this.validatingPromise;
    }

    this.validatingPromise = new Promise(async (finishValidating) => {

      // Then, we process the validating events in order
      while (this.validatingQueue.length) {
        const { name, valid } = this.validatingQueue[0];

        // We update the validity of the data that changed
        const newFormDataValidity = {
          ...this.state.formDataValidity,
          [name]: valid
        };

        // We wait for the validator to pass down the updated form validity
        await new Promise((resolve) => {
          this.setState({
            formDataValidity: newFormDataValidity,
            isFormValid: Object.keys(newFormDataValidity).reduce((formValid, currentFormKey) => {
              return formValid && newFormDataValidity[currentFormKey];
            }, true)
          }, resolve);
        });

        // We remove the event we just processed
        this.validatingQueue.shift();
      }

      // Queue is empty, we resolve the promise
      finishValidating();
    });
  };

  render () {
    return this.props.children({
      isFormValid: this.state.isFormValid,
      validator: { onChange: this.handleFormChange }
    });
  }
};

FormValidator.propTypes = {
  children: PropTypes.func.isRequired
};