import React from 'react';
import styled from 'styled-components';
import Colors from 'CONSTANTS/Colors';
import LogoSVG from 'ASSETS/images/logo_white.svg';
import HotboxSVG from 'ASSETS/images/hotbox_white.svg';
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

const LogoContainer = styled.div`
  padding: 10px 15px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.05);
`;

const Hotbox = styled(HotboxSVG)`
  height: 20px;
  margin-left: 15px;
`;

const HomeLink = styled(Link)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover ${LogoContainer} {
    background-color: rgba(255, 255, 255, 0.15);
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

export default class Header extends React.PureComponent {
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
            <HomeLink to={Routes.HOME}>
              <LogoContainer>
                <Logo/>
              </LogoContainer>
              <Hotbox />
            </HomeLink>
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

Header.propTypes = {
  fixedWidth: PropTypes.bool
};

Header.defaultProps = {
  fixedWidth: false
};
