import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledBasket = styled.div``;

class Basket extends React.Component {
  render () {
    const { id } = this.props;
    return (
      <StyledBasket>basket {id}</StyledBasket>
    );
  }
};

export default connect(
  state => ({
    baskets: state.baskets
  })
)(Basket);