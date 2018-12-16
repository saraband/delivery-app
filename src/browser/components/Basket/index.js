import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  ADD_PRODUCT,
  REMOVE_PRODUCT
} from 'STORE/baskets';
import Colors from 'CONSTANTS/Colors';
import BaseButton, { ButtonTypes } from '../Form/BaseButton';
import AddIcon from 'ICONS/AddIcon';
import RemoveIcon from 'ICONS/RemoveIcon';
import FontSizes from '../../constants/FontSizes';
import FlipMove from 'react-flip-move';
import ToolTip from 'COMPONENTS/ToolTip';

const StyledBasket = styled.div`
  border: 1px solid ${Colors.LIGHT_GREY};
  border-radius: 3px;
  padding: 10px;
  position: sticky;
  top: 20px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductQuantity = styled.h3``;
const ProductName = styled.h4`
  color: ${Colors.BLACK};
  font-size: ${FontSizes.MEDIUM};
  font-family: 'Roboto';
  font-weight: 200;
  flex-grow: 1;
  margin-left: 10px;
`;
export const ProductControls = styled.div`
  display: flex;
  align-items: center;
`;

export const ControlButton = styled(BaseButton).attrs({
  round: true,
  type: ButtonTypes.EMPTY
})`
  filter: grayscale(100%);
  opacity: 0.5;
  
  &:hover {
    filter: grayscale(0);
    opacity: 1;
  }
`;

const Title = styled.h2`
  color: ${Colors.DARK_GREY};
  text-align: center;
`;

class Basket extends React.Component {
  render () {
    const {
      id,
      baskets,
      addProduct,
      removeProduct
    } = this.props;
    const products = baskets[id];

    return (
      <StyledBasket>
        <Title>Your basket (&nbsp;64.5 €&nbsp;)</Title>
        <FlipMove enterAnimation='fade' leaveAnimation='fade'>

          {/* TODO: split this into a product item component */}
          {Object.keys(products || []).map(productId => {
            const product = products[productId];

            return (
              <Product key={product.id}>
                <ProductQuantity>{product.quantity}</ProductQuantity>
                <ProductName>{product.name}</ProductName>
                <ProductControls>
                  <ToolTip label='Remove item'>
                    <ControlButton
                      icon={<RemoveIcon height={12} color={Colors.RED} />}
                      onClick={() => removeProduct(product)}
                    />
                  </ToolTip>
                  <ToolTip label='Add item'>
                    <ControlButton
                      icon={<AddIcon height={12} color={Colors.GREEN} />}
                      onClick={() => addProduct(product)}
                    />
                  </ToolTip>
                </ProductControls>
              </Product>
            );
          })}
        </FlipMove>
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
