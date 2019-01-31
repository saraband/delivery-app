import React from 'react';
import styled, { keyframes } from 'styled-components';
import Logo from 'ASSETS/images/placeholder.svg';
import FontSizes from 'CONSTANTS/FontSizes';
import Colors from 'CONSTANTS/Colors';
import CitySearch from 'COMPONENTS/CitySearch';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FadeRight = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-50px, 0, 0);
  } to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const FadeLeft = keyframes`
  from {
    opacity: 0;
    transform: translate3d(50px, 0, 0);
  } to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: ${FontSizes.BIG};
  color: ${Colors.DARK_BLUE};
  font-weight: lighter;
  margin-left: 40px;
  animation: ${FadeLeft} 0.5s ease-out forwards;
`;

const StyledLogo = styled(Logo).attrs({
  height: 100
})`
  animation: ${FadeRight} 0.5s ease-out forwards;
`;

const StyledCitySearch = styled(CitySearch)`
  width: 400px;
  margin-top: 50px;
`;


export default class HomePage extends React.Component {
  render () {
    return (
      <Container>
        <Header>
          <StyledLogo />
          <Title>Where do you want your food delivered ?</Title>
        </Header>
        <StyledCitySearch />
      </Container>
    );
  }
};
