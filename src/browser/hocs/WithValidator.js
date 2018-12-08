/*
 *  WithValidator.js
 *  ----------------
 *  HOC that adds a validator to the component. The component can then
 *  make <Input> components suscribe to the validator,
 *  which will allow the validator to know when the form is valid
 *
 *  TODO: Maybe add a static counter to segment validators in case
 *  TODO: there are multiple validator with the same input names ?
 */

import React from 'react';

export default Component => {
  return class extends React.Component {
    constructor (props) {
      super(props);

      this.state = {
        isFormValid: false,
        formDataValidity: {}
      };
    }

    // We pass this function as a prop
    // so inputs that wish to subscribe to this validator
    // use it and let the validator know when the form
    // is valid
    handleFormChange = ({ name, valid }) => {

      // We update the validity of the data that changed
      const newFormDataValidity = {
        ...this.state.formDataValidity,
        [name]: valid
      };

      // And we pass down the validity of the form
      this.setState({
        formDataValidity: newFormDataValidity,
        isFormValid: Object.keys(newFormDataValidity).reduce((formValid, currentFormKey) => {
          return formValid && newFormDataValidity[currentFormKey]
        }, true)
      })
    }

    render () {
      return (
        <Component

          // We pass down the state of the form
          // and the handler function
          isFormValid={this.state.isFormValid}
          validator={{ onChange: this.handleFormChange }}

          // Rest of the props
          {...this.props}
          />
      );
    }
  };
};
