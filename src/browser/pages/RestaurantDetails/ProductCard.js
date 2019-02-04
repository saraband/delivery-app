import React, {memo} from 'react';
import styled from 'styled-components';
import { ProductControls, ControlButton } from 'COMPONENTS/Basket/Product';
import ToolTip from 'COMPONENTS/ToolTip';
import RemoveIcon from 'ICONS/RemoveIcon';
import AddIcon from 'ICONS/AddIcon';
import Colors from 'CONSTANTS/Colors';
import {BoxShadow} from '../../misc/Styles';

const Product = styled.div`
  width: 100%;
  height: 100%;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  padding: 8px;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  width: 50%;
  height: 100px;
  position: relative;
  cursor: pointer;
  border-radius: 3px;
  padding-right: 5px;
  padding-bottom: 10px;s
  
  &:nth-child(even) {
    padding-left: 5px;
    padding-right: 0;
  }
  
  &:hover ${Product} {
    ${BoxShadow};
  }
`;

const ProductInformation = styled.div`
  flex-grow: 1;
`;
const ProductName = styled.h4``;
const ProductIngredients = styled.p``;

export default memo(({
  id,
  name,
  price,
  ingredients,
  addProduct,
  removeProduct
}) => (
  <Container>
    <Product>
      <ProductInformation>
        <ProductName>{name}</ProductName>
        <ProductIngredients>{ingredients.join(', ')}</ProductIngredients>
      </ProductInformation>
      <ProductControls>
        <ToolTip label='Remove item'>
          <ControlButton
            onClick={removeProduct}
            icon={<RemoveIcon height={12} color={Colors.RED} />}
            />
        </ToolTip>
        <ToolTip label='Add item'>
          <ControlButton
            onClick={addProduct}
            icon={<AddIcon height={12} color={Colors.GREEN} />}
            />
        </ToolTip>
      </ProductControls>
    </Product>
  </Container>
));
