import React from 'react';
import styled from 'styled-components';
import Colors from '../constants/Colors';

const StyledHeader = styled.header`
  flex-grow: 0;
  background-color: ${Colors.BLUE};
  padding: 20px;
  color: white;
`;

export default class extends React.Component {
  render () {
    return (
      <StyledHeader>
        <h1>Delivery</h1>
      </StyledHeader>
    );
  }
};