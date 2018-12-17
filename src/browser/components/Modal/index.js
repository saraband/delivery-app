import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  
`;

export default class Modal extends React.PureComponent {
  render () {
    const {
      children
    } = this.props;

    return (
      <Container>
        {children}
      </Container>
    );
  }
}
