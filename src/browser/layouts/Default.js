import React, { memo } from 'react';
import styled from 'styled-components';
import Header from 'COMPONENTS/Header';
import Footer from 'COMPONENTS/Footer';
import { Breakpoints } from 'HELPERS/MediaQueries';

const Body = styled.section`
  flex-grow: 1;
  padding: 30px;
  
  ${p => p.fixedWidth
    ? `
      margin: auto;
      width: ${Breakpoints.desktop}px;
      `
    : ``
  }
`;

const StyledLayout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default memo(({ children, fixedWidth = false }) => (
  <StyledLayout>
    <Header fixedWidth={fixedWidth} />
    <Body fixedWidth={fixedWidth}>
      {children}
    </Body>
    <Footer fixedWidth={fixedWidth}/>
  </StyledLayout>
));
