import React, { memo } from 'react';
import styled from 'styled-components';
import ToolTip from 'COMPONENTS/ToolTip';
import RemoveIcon from 'ICONS/RemoveIcon';
import AddIcon from 'ICONS/AddIcon';
import Colors from 'CONSTANTS/Colors';
import FontSizes from 'CONSTANTS/FontSizes';
import BaseButton, {ButtonTypes, TextContainer} from 'COMPONENTS/Form/BaseButton';
import {Flex} from 'MISC/Styles';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  
  &:first-child { margin-top: 20px; }
  &:last-child { margin-bottom: 20px; }
`;

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const ProductPrice = styled.h3`
  font-size: ${FontSizes.SMALL};
  font-weight: normal;
  color: ${Colors.BLUE};
  padding: 0 5px;
  width: 40px;
  text-align: center;
`;
const ProductQuantity = styled(ProductPrice).attrs({
  as: 'span'
})`
  display: inline-block;
  font-size: ${FontSizes.NORMAL};
  width: 30px;
  text-align: left;
`;

const ProductNameToolTip = styled(ToolTip)`
  flex-grow: 1;
`;
const ProductName = styled.h4`
  color: ${Colors.BLACK};
  font-size: ${FontSizes.NORMAL};
  font-family: 'Roboto';
  font-weight: 200;
  flex-grow: 1;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

// TODO: refactor this, weirdly exported
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
  width: 30px;
  height: 30px;
  
  ${TextContainer} {
    padding: 8px !important;
  }
  
  &:hover {
    filter: grayscale(0);
    opacity: 1;
  }
`;

export default memo(({
  id,
  name,
  price,
  quantity,
  add,
  remove
}) => (
  <Container>
    <ProductName label={name}>
      <ProductQuantity>{quantity}</ProductQuantity>{name}
    </ProductName>
    <ProductControls>
      <ToolTip label='Remove item'>
        <ControlButton
          icon={<RemoveIcon height={10} color={Colors.RED} />}
          onClick={remove}
        />
      </ToolTip>
      <ProductPrice>{price * quantity}€</ProductPrice>
      <ToolTip label='Add item'>
        <ControlButton
          icon={<AddIcon height={10} color={Colors.BLUE} />}
          onClick={add}
        />
      </ToolTip>
    </ProductControls>
  </Container>
));
