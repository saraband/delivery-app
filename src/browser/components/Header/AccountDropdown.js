import React, { memo } from 'react';
import styled, { css } from 'styled-components';
import Colors from 'CONSTANTS/Colors';
import ProfileSVG from 'ASSETS/images/profile.svg';
import BaseButton, { ButtonTypes, TextContainer } from 'COMPONENTS/Form/BaseButton';
import withDropdown from 'HOCS/WithDropDown'
import { compose } from 'redux';
import { GET_ACCOUNT_INFO } from 'COMPONENTS/Header/Profile';
import Query from 'react-apollo/Query';
import { Flex } from 'MISC/Styles';
import FontSizes from 'CONSTANTS/FontSizes';

// BUTTON
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

// DROP DOWN
const DropdownContainer = styled.div`
  padding: 10px;
`;

const Avatar = styled.div`
  background-color: ${Colors.LIGHT_GREY};
  width: 85px;
  height: 85px;
  background: url(${p => p.url});
  background-size: cover;
  background-position: 50% 50%;
`;

const Username = styled.h2`
  color: ${Colors.BLACK};
  font-size: ${FontSizes.NORMAL};
  margin-bottom: 5px;
  font-weight: normal;
`;

const Email = styled.h4`
  font-size: ${FontSizes.SMALL};
  color: ${Colors.GREY};
  margin-bottom: 5px;
  font-weight: normal;
`;

const ViewProfileLink = styled.h4`
  font-size: ${FontSizes.NORMAL};
  color: ${Colors.BLUE};
  margin-bottom: 10px;
  font-weight: normal;
  cursor: pointer;
`;

const LogoutButton = styled(BaseButton).attrs({
  type: ButtonTypes.FULL
})`
  margin-top: 10px;
`;

const ProfileDropdown = () => (
  <Query query={GET_ACCOUNT_INFO}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading</p>;
      if (error) return <p>Error</p>;

      const {
        email,
        username,
        avatarUrl
      } = data.self;

      return (
        <DropdownContainer>
          <Flex direction='column'>
            <Flex>
              <Avatar url={avatarUrl} />
              <Flex direction='column' css={css`padding-left: 10px`}>
                <Username>{username}</Username>
                <Email>{email}</Email>
                <ViewProfileLink>View profile</ViewProfileLink>
              </Flex>
            </Flex>
            <LogoutButton>Log out</LogoutButton>
          </Flex>
        </DropdownContainer>
      );
    }}
  </Query>
);

export default compose(
  withDropdown(ProfileDropdown),
  memo
)(ProfileButtonComponent);