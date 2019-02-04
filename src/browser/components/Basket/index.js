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
  ADD_PRODUCT,
  REMOVE_PRODUCT
} from 'STORE/baskets';

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
    const {
      id,
      baskets
    } = this.props;
    const currentBasket = baskets[id];
    const nextBasket = nextProps.baskets[nextProps.id];
    
    return JSON.stringify(currentBasket) !== JSON.stringify(nextBasket);
  }

  render () {
    const {
      id,
      baskets,
      addProduct,
      removeProduct
    } = this.props;
    const products = baskets[id];
    const total = Object.keys(products).reduce((acc, currentId) => acc + products[currentId].price * products[currentId].quantity, 0);

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
          <BaseButton type={ButtonTypes.EMPTY}>Clear</BaseButton>
          <BaseButton type={ButtonTypes.FULL}>Checkout</BaseButton>
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
    removeProduct: (product) => dispatch({ type: REMOVE_PRODUCT, product })
  })
)(Basket);
