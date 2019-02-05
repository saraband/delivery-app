import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import FlipMove from 'react-flip-move';
import Product, { Controls } from './Product';
import Colors from 'CONSTANTS/Colors';
import BaseButton, { ButtonTypes } from 'COMPONENTS/Form/BaseButton';
import AddIcon from 'ICONS/AddIcon';
import RemoveIcon from 'ICONS/RemoveIcon';
import ToolTip from 'COMPONENTS/ToolTip';

import {
  ADD_PRODUCT, CLEAR_BASKET,
  REMOVE_PRODUCT
} from 'STORE/baskets';
import { deepEqual } from 'HELPERS';

const StyledBasket = styled.div`
  border: 1px solid ${Colors.LIGHT_GREY};
  border-radius: 3px;
  padding: 10px;
  position: sticky;
  top: 20px;
`;

const Title = styled.h2`
  color: ${Colors.DARK_GREY};
  text-align: center;
`;

class Basket extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const currentBasket = this.props.baskets[this.props.id];
    const nextBasket = nextProps.baskets[nextProps.id];

    // Update if the current basket has changed
    return !deepEqual(currentBasket, nextBasket);
  }

  goToCheckout = () => {
    console.log('checkout');
  };

  render () {
    const {
      id,
      baskets,
      addProduct,
      removeProduct,
      clearBasket
    } = this.props;
    const products = (baskets[id] && baskets[id].products) || [];
    const total = Object.values(products).reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

    return (
      <StyledBasket>
        <Title>Your basket (&nbsp;{total} €&nbsp;)</Title>
        {Object.keys(products || []).map(productId => {
          const product = products[productId];
          return (
            <Product
              key={product.id}
              add={() => addProduct(product)}
              remove={() => removeProduct(product)}
              {...product}
              />
          );
        })}
        <Controls>
          <BaseButton onClick={() => clearBasket(id)} type={ButtonTypes.EMPTY}>Clear</BaseButton>
          <BaseButton onClick={this.goToCheckout} type={ButtonTypes.FULL}>Checkout</BaseButton>
        </Controls>
      </StyledBasket>
    );
  }
}

export default connect(
  state => ({
    baskets: state.baskets
  }),
  dispatch => ({
    addProduct: (product) => dispatch({ type: ADD_PRODUCT, product }),
    removeProduct: (product) => dispatch({ type: REMOVE_PRODUCT, product }),
    clearBasket: (basketId) => dispatch({ type: CLEAR_BASKET, basketId })
  })
)(Basket);
