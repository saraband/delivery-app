import React from 'react';
import styled from 'styled-components';
import Colors from '../constants/Colors';
import LogoSVG from 'DIST/images/logo.svg';
import ProfileSVG from 'DIST/images/profile.svg';
import FontSizes from 'CONSTANTS/FontSizes';
import BaseButton, { ButtonTypes } from 'COMPONENTS/Form/BaseButton';
import ToolTip from 'COMPONENTS/ToolTip';
import { Link } from 'react-router-dom';
import Routes from 'ROUTES';

const StyledHeader = styled.header`
  flex-grow: 0;
  background-color: ${Colors.BLUE};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;
const Right = styled.div`
  padding-right: 10px;
`;

const Title = styled.h1`
  color: ${Colors.WHITE};
  font-size: ${FontSizes.BIG};
  font-weight: lighter;
  margin-left: 10px;
`;

const Logo = styled(LogoSVG)`
  height: 40px;
`;

const LogoLink = styled(Link)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  transition: all 0.1s ease-in-out;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const Profile = styled(BaseButton).attrs({
  round: true,
  type: ButtonTypes.FULL,
  color: Colors.WHITE
})`
  width: 35px;
  height: 35px;
`;

const ProfileLogo = styled(ProfileSVG)`
  height: 20px;
`;

export default class extends React.Component {
  render () {
    return (
      <StyledHeader>
        <Left>
          <LogoLink to={Routes.HOME}>
            <Logo />
          </LogoLink>
          <Title>Yumbox</Title>
        </Left>
        <Right>
          <Profile>
            <ProfileLogo />
          </Profile>
        </Right>
      </StyledHeader>
    );
  }
};