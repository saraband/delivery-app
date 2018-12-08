import React from 'react';
import styled from 'styled-components';
import Colors from 'CONSTANTS/Colors';
import FontSizes from 'CONSTANTS/FontSizes';

const StyledButton = styled.button`
  border-radius: 3px;
  padding: 7px 12px 6px 12px;
  box-sizing: border-box;
  cursor: pointer;
  color: white;
  font-size: ${FontSizes.MEDIUM};
  border: 0;
  border-bottom: 3px solid ${Colors.DARK_ORANGE};
  background-color: ${Colors.ORANGE};
  transition: all 0.1s ease-in-out;
  box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.1);
  text-shadow: 0 -2px rgba(0, 0, 0, 0.1);
  
  &:hover {
    opacity: 0.8;
  }
  
  &:disabled {
    filter: grayscale(100%);
    
    &:hover {
      opacity: unset;
      cursor: not-allowed;
    }
  }
`;

export default class BaseButton extends React.PureComponent {
  render () {
    const {
      children,
      ...rest
    } = this.props;

    return (
      <StyledButton {...rest}>
        {this.props.children}
      </StyledButton>
    );
  }
};