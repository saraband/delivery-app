import React, { memo } from 'react';
import styled from 'styled-components';
import Colors from 'CONSTANTS/Colors';
import ProfileSVG from 'ASSETS/images/profile.svg';
import BaseButton, { ButtonTypes, TextContainer } from 'COMPONENTS/Form/BaseButton';
import withDropdown from 'HOCS/WithDropDown'
import { compose } from 'redux';

const ProfileButton = styled(BaseButton).attrs({
  round: true,
  type: ButtonTypes.FULL,
  color: Colors.WHITE
})`
  width: 35px;
  height: 35px;
  
  ${TextContainer} {
    padding: 7px;
  }
`;

const ProfileLogo = styled(ProfileSVG)`
  height: 20px;
`;

const ProfileButtonComponent = () => (
  <ProfileButton><ProfileLogo /></ProfileButton>
);

const ProfileDropdown = () => (
  <p>dd</p>
);

export default compose(
  withDropdown(ProfileDropdown),
  memo
)(ProfileButtonComponent);