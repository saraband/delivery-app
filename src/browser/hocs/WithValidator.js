/*
 *  WithValidator.js
 *  ----------------
 *  HOC version of COMPONENT/Form/FormValidator `render props` component
 */

import React from 'react';
import FormValidator from 'COMPONENTS/Form/FormValidator';

export default Component => {
  return class extends React.Component {
    render () {
      return (
        <FormValidator>
          {(validatorProps) => (
            <Component
              { ...this.props }
              { ...validatorProps }
              />
          )}
        </FormValidator>
      );
    }
  };
};
