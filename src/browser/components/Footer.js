import React, { memo } from 'react';
import styled from 'styled-components';
import Colors from '../constants/Colors';
import { Breakpoints } from 'HELPERS/MediaQueries';
import PropTypes from 'prop-types';
import Index from 'COMPONENTS/Header';

const StyledFooter = styled.footer`
  flex-grow: 0;
  background-color: ${Colors.BLUE};
  color: white;
`;

const ResponsiveWidthContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const FixedWidthContainer = styled(ResponsiveWidthContainer)`
  width: ${Breakpoints.desktop}px;
  margin: auto;
  height: 100%;
`;

const CopyrightContainer = styled.p`
  text-align: center;
  width: 100%;
`;

export default class Footer extends React.PureComponent {
  render() {
    const { fixedWidth } = this.props;
    const WidthContainer = fixedWidth
      ? FixedWidthContainer
      : ResponsiveWidthContainer;

    return (
      <StyledFooter>
        <WidthContainer>
          <CopyrightContainer>All rights reserved &copy; Yassine Hermellin 2019 - This website is a fictional demo application</CopyrightContainer>
        </WidthContainer>
      </StyledFooter>
    );
  }
};

Footer.propTypes = {
  fixedWidth: PropTypes.bool
};

Footer.defaultProps = {
  fixedWidth: false
};
