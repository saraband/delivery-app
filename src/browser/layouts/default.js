import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Body = styled.section`
  flex-grow: 1;
  padding: 30px;
`;

const StyledLayout = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default ({ children }) => (
  <StyledLayout>
    <Header />
    <Body>
      {children}
    </Body>
    {/*<Footer />*/}
  </StyledLayout>
);
