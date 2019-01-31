import React, {memo} from 'react';
import styled from 'styled-components';
import Colors from 'CONSTANTS/Colors';
import LogoSVG from 'ASSETS/images/logo_white.svg';
import HotboxSVG from 'ASSETS/images/hotbox_white.svg';
import ProfileSVG from 'ASSETS/images/profile.svg';
import FontSizes from 'CONSTANTS/FontSizes';
import BaseButton, { ButtonTypes, TextContainer } from 'COMPONENTS/Form/BaseButton';
import { Link } from 'react-router-dom';
import Routes from 'ROUTES';
import PropTypes from 'prop-types';
import {Breakpoints} from 'HELPERS/MediaQueries';
import { BoxShadow } from 'MISC/Styles';
import Profile from './Profile';

const StyledHeader = styled.header`
  flex-grow: 0;
  background-color: ${Colors.BLUE};
  ${BoxShadow}
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  padding-right: 10px;
`;

const Logo = styled(LogoSVG)`
  height: 40px;
`;

const HotboxContainer = styled.div`
  padding: 10px 15px;
`;

const Hotbox = styled(HotboxSVG)`
  height: 25px;
`;

const LogoLink = styled(Link)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  background-color: rgba(255, 255, 255, 0.1);
  transition: all 0.1s ease-in-out;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const ResponsiveWidthContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FixedWidthContainer = styled(ResponsiveWidthContainer)`
  width: ${Breakpoints.desktop}px;
  margin: auto;
  height: 100%;
`;

export default class Index extends React.PureComponent {
  render() {
    const { fixedWidth } = this.props;
    const WidthContainer = fixedWidth
      ? FixedWidthContainer
      : ResponsiveWidthContainer;

    return (
      <StyledHeader>
        <WidthContainer>
          {/* LEFT PART */}
          <Left>
            <LogoLink to={Routes.HOME}>
              <Logo/>
            </LogoLink>
            <HotboxContainer>
              <Hotbox />
            </HotboxContainer>
          </Left>

          {/* RIGHT PART */}
          <Right>
            <Profile />
          </Right>
        </WidthContainer>
      </StyledHeader>
    );
  }
};

Index.propTypes = {
  fixedWidth: PropTypes.bool
};

Index.defaultProps = {
  fixedWidth: false
};
