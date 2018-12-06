import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import nullFunc from 'MISC/NullFunction';
import Colors from 'CONSTANTS/Colors';

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

export default class BaseInput extends React.PureComponent {
  render () {
    const {
      icon,
      type,
      onChange,
      onFocus
    } = this.props;

    return (
      <StyledInput
        icon={icon}
        onChange={onChange}
        onFocus={onFocus}
        />
    );
  }
};

BaseInput.propTypes = {
  icon: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func
};

BaseInput.defaultProps = {
  icon: '',
  type: 'text',
  onChange: nullFunc,
  onFocus: nullFunc
};