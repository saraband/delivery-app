import React from 'react';
import styled from 'styled-components';
import Colors from '../constants/Colors';
import Logo from 'ASSETS/logo.svg';

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

const StyledLogo = styled(Logo)`
  height: 40px;
  margin-right: 10px;
`;

export default class extends React.Component {
  render () {
    return (
      <StyledHeader>
        <StyledLogo />
        <Title>どうぞめしあがれ</Title>
      </StyledHeader>
    );
  }
};