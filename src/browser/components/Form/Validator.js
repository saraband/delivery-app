/*
 *	Validator.js
 *	------------
 *	This component uses the `render props` technique and the
 *	withValidator HOC to validate a form (TODO: messy explanation)
 */

import React from 'react';
import PropTypes from 'prop-types';
import withValidator from '../../hocs/WithValidator';

class Validator extends React.Component {
	render () {
		const {
			isFormValid,
			validator
		} = this.props;

		return this.props.children({
			isFormValid,
			validator
		});
	}
}

Validator.propTypes = {
	children: PropTypes.func.isRequired
};

export default withValidator(Validator);
