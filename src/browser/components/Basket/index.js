import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  ADD_PRODUCT,
  REMOVE_PRODUCT
} from 'STORE/baskets';

const StyledBasket = styled.div``;

class Basket extends React.Component {
  render () {
    const {
      id,
      baskets,
      addProduct,
      removeProduct
    } = this.props;
    const products = baskets[id];
    console.log(products)

    return (
      <StyledBasket>
        basket {id}
        <button onClick={() => addProduct({ id: 72, name: 'Porc pane', restaurantId: id })}>add</button>
        <button onClick={() => removeProduct({ id: 72, name: 'Porc pane', restaurantId: id })}>remove</button>
      </StyledBasket>
    );
  }
};

export default connect(
  state => ({
    baskets: state.baskets
  }),
  dispatch => ({
    addProduct: (product) => dispatch({ type: ADD_PRODUCT, product }),
    removeProduct: (product) => dispatch({ type: REMOVE_PRODUCT, product })
  })
)(Basket);