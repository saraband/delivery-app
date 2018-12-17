import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  
`;

/*
 *  TODO: ModalProvider ?
 */

export default class Modal extends React.PureComponent {
  render () {
    const {
      children
    } = this.props;

    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }
}
