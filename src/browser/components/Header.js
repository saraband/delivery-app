import React from 'react';
import styled from 'styled-components';
import Colors from '../constants/Colors';
import Logo from 'ROOT/design/dist/logo.svg';

const StyledHeader = styled.header`
  flex-grow: 0;
  background-color: ${Colors.ORANGE};
  padding: 10px;
  color: white;
  display: flex;
  align-items: center;
`;

const StyledLogo = styled(Logo)`
  width: 50px;
  margin-right: 10px;
`;

const Title = styled.h1`

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