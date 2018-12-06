import React from 'react';
import styled from 'styled-components';
import Colors from '../constants/Colors';

const StyledFooter = styled.footer`
  flex-grow: 0;
  background-color: ${Colors.BLUE};
  padding: 20px;
  color: white;
`;

export default class extends React.Component {
  render () {
    return (
      <StyledFooter>
        <h1>Footer</h1>
      </StyledFooter>
    );
  }
};