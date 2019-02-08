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
import {deepEqual, hexToRgbaString} from 'HELPERS';
import {Flex} from 'MISC/Styles';
import FontSizes from 'CONSTANTS/FontSizes';

const StyledBasket = styled.div`
  border: 1px solid ${Colors.LIGHT_GREY};
  border-radius: 3px;
  padding: 10px;
  position: sticky;
  top: 20px;
`;

const Title = styled.h2`
  color: ${Colors.DARK_BLUE_2};
  text-align: center;
  font-weight: normal;
  background-color: ${hexToRgbaString(Colors.BLUE, 0.2)};
  padding: 8px 0;
`;

const ProductsList = styled.div`
  min-height: 100px;
`;

const EmptyBasket = styled.p`
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${FontSizes.SMALL};
  color: ${Colors.GREY};
`;

const TotalContainer = styled.div`
  background-color: ${hexToRgbaString(Colors.BLUE, 0.2)};
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const TotalText = styled.span`
  color: ${Colors.DARK_BLUE_2};
  font-weight: normal;
`;

const TotalSum = styled.span`
  color: ${Colors.BLUE};
  font-weight: bold;
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
    const isBasketEmpty = Object.keys(products).length === 0;
    const total = Object.values(products).reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

    return (
      <StyledBasket>
        <Title>Your basket</Title>

        {/* Product list */}
        <ProductsList>
          {isBasketEmpty
            ? <EmptyBasket>Your basket is currently empty.</EmptyBasket>
            : Object.values(products || []).map((product) => {
                return (
                  <Product
                    key={product.id}
                    add={() => addProduct(product)}
                    remove={() => removeProduct(product)}
                    {...product}
                    />
                );
              })
          }
        </ProductsList>

        {/* Total */}
        <TotalContainer>
          <TotalText>Total</TotalText>
          <TotalSum>{total} €</TotalSum>
        </TotalContainer>

        {/* Controls  */}
        <Controls>
          <BaseButton
            disabled={isBasketEmpty}
            onClick={() => clearBasket(id)}
            type={ButtonTypes.EMPTY}
            >
            Clear
          </BaseButton>
          <BaseButton
            disabled={isBasketEmpty}
            onClick={this.goToCheckout}
            type={ButtonTypes.FULL}
            >
            Checkout
          </BaseButton>
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
