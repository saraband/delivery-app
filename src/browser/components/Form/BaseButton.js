import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Colors from 'CONSTANTS/Colors';

const StyledButton = styled.button`
  border: 0;
  border-radius: 3px;
  padding: 8px;
  color: ${Colors.WHITE};
  background-color: ${Colors.BLUE};
  text-shadow: 0px -2px rgba(0, 0, 0, 0.5);
  border-bottom: 2px solid ${Colors.DARK_BLUE};
  box-shadow: inset 0 0 15px 10px rgba(0, 0, 0, 0.08);
  font-size: 14px;
  transition: all 0.15s ease-in-out;
  margin-left: 20px;
  cursor: pointer;
  
  &:focus,
  &:active {
    box-shadow: 0 0 0 3px ${Colors.LIGHT_BLUE};
    border-color: ${Colors.BLUE};
  }
`;

export default class BaseButton extends React.PureComponent {
  render () {
    return (
      <StyledButton>
        {this.props.children}
      </StyledButton>
    );
  }
};

BaseButton.propTypes = {
};

BaseButton.defaultProps = {
};