import React, { memo } from 'react';
import styled from 'styled-components';
import FontSizes from 'CONSTANTS/FontSizes';
import Colors from 'CONSTANTS/Colors';

const Container = styled.div`
  width: 100%;
  position: relative;
  margin: 20px 0;
`;

const Content = styled.h2`
  font-size: ${FontSizes.MEDIUM};
  font-weight: bold;
  display: inline-block;
  padding-right: 5px;
  color: ${Colors.BLUE};
  background-color: ${Colors.WHITE};
  z-index: 50;
  position: relative;
`;

const Bar = styled.div`
  position: absolute;
  z-index: 45;
  height: 2px;
  width: 100%;
  top: 50%;
  left: 0;
  background-color: ${Colors.BLUE};
`;

export default memo(({ children, ...rest }) => (
  <Container {...rest}>
    <Content>{children}</Content>
    <Bar />
  </Container>
));