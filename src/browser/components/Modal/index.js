import React from 'react';
import styled from 'styled-components';
import Colors from 'CONSTANTS/Colors';
import Section from 'COMPONENTS/Section';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled(Section)`
  width: 550px;
  height: 300px;
  background-color: ${Colors.WHITE};
  border-radius: 3px;
  display: flex;
`;

export default class Modal extends React.PureComponent {
  render () {
    const {
      children,
      ...rest
    } = this.props;

    return (
      <Container>
        <ModalContainer {...rest}>
          {children}
        </ModalContainer>
      </Container>
    );
  }
}
