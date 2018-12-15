import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  ADD_PRODUCT,
  REMOVE_PRODUCT
} from 'STORE/baskets';
import Colors from 'CONSTANTS/Colors';
import BaseButton, { ButtonTypes } from '../Form/BaseButton';

const StyledBasket = styled.div`
  border: 1px solid ${Colors.LIGHT_BLUE};
  border-radius: 3px;
  padding: 10px;
  position: sticky;
  top: 20px;
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
        basket {id}
        <BaseButton color='#FF9505' type={ButtonTypes.FULL}>Check out</BaseButton>
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
