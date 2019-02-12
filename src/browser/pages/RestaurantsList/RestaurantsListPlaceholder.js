import React, { Fragment } from 'react';
import styled from 'styled-components';
import Placeholder from 'COMPONENTS/Placeholder';
import { ResponsiveContainer } from './RestaurantCard';

const StyledResponsiveContainer = styled(ResponsiveContainer)`
  display: flex;
  flex-direction: column;
`;

const StyledCardPlaceholder = styled(Placeholder)`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  flex-grow: 1;
`;

export default class extends React.PureComponent {
  render () {
    return (
      <Fragment>
        {new Array(5).fill(1).map((_, index) => (
          <StyledResponsiveContainer key={index}>
            <StyledCardPlaceholder />
          </StyledResponsiveContainer>
        ))}
      </Fragment>
    );
  }
}