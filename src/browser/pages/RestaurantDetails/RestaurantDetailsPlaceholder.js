import React, { Fragment } from 'react';
import styled from 'styled-components';
import Placeholder from 'COMPONENTS/Placeholder';
import { Flex } from 'MISC/Styles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const BannerPlaceholder = styled(Placeholder)`
  width: 100%;
  height: 100%;
`;

export default class extends React.PureComponent {
  render () {
    return (
      <Container>
        <BannerPlaceholder />
      </Container>
    );
  }
}