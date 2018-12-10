import React from 'react';
import styled from 'styled-components';
import Colors from '../constants/Colors';

const StyledHeader = styled.header`
  flex-grow: 0;
  background-color: ${Colors.ORANGE};
  padding: 10px;
  color: white;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`

`;

export default class extends React.Component {
  render () {
    return (
      <StyledHeader>
        <Title>どうぞめしあがれ</Title>
      </StyledHeader>
    );
  }
};