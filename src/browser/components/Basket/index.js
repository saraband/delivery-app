import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Product, { Controls } from './Product';
import Colors from 'CONSTANTS/Colors';
import BaseButton, { ButtonTypes } from 'COMPONENTS/Form/BaseButton';
import Routes from 'ROUTES';
import PropTypes from 'prop-types';
import {
  ADD_PRODUCT,
  CLEAR_BASKET,
  REMOVE_PRODUCT
} from 'STORE/baskets';
import { deepEqual, hexToRgbaString } from 'HELPERS';
import FontSizes from 'CONSTANTS/FontSizes';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { addParamsToUrl } from 'ROUTES';

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
    const {
      history,
      id
    } = this.props;

    history.push(addParamsToUrl(Routes.RESTAURANT_CHECKOUT, { id }));
  };

  render () {
    const {
      id,
      baskets,
      addProduct,
      removeProduct,
      clearBasket,
      showButtons,
      ...rest
    } = this.props;
    const products = (baskets[id] && baskets[id].products) || [];
    const isBasketEmpty = Object.keys(products).length === 0;
    const total = Object.values(products).reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

    return (
      <StyledBasket {...rest}>
        <Title>Your basket</Title>

        {/* Product list */}
        <ProductsList>
          {isBasketEmpty
            ? <EmptyBasket>Your basket is currently empty.</EmptyBasket>
            : Object.values(products || []).map((product) => {
                return (
                  <Product
                    key={product.id}
                    showButtons={showButtons}
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
        {showButtons && (
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
        )}
      </StyledBasket>
    );
  }
}

Basket.propTypes = {
  showButtons: PropTypes.bool
};

Basket.defaultProps = {
  showButtons: true
};

const apply = compose(
  withRouter,
  connect(
    state => ({
      baskets: state.baskets
    }),
    dispatch => ({
      addProduct: (product) => dispatch({ type: ADD_PRODUCT, product }),
      removeProduct: (product) => dispatch({ type: REMOVE_PRODUCT, product }),
      clearBasket: (basketId) => dispatch({ type: CLEAR_BASKET, basketId })
    })
  )
);

export default apply(Basket);
