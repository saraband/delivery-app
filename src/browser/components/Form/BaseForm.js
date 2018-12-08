/*
 *	BaseForm.js
 *	------------
 *	Custom form
 */

import React from 'react';
import PropTypes from 'prop-types';

export default class BaseForm extends React.Component {
  render () {
    return (
      <form {...this.props}>
        {this.props.children}
      </form>
    );
  }
};

function preventDefault (event) {
  event.preventDefault();
}

BaseForm.propTypes = {
  onSubmit: PropTypes.func
};

BaseForm.defaultProps = {
  onSubmit: preventDefault
}