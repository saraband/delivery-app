import React, { memo } from 'react';
import styled from 'styled-components';
import ToolTip from 'COMPONENTS/ToolTip';
import RemoveIcon from 'ICONS/RemoveIcon';
import AddIcon from 'ICONS/AddIcon';
import Colors from 'CONSTANTS/Colors';
import FontSizes from 'CONSTANTS/FontSizes';
import BaseButton, { ButtonTypes } from 'COMPONENTS/Form/BaseButton';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
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
  width: 40px;
  height: 40px;
  
  &:hover {
    filter: grayscale(0);
    opacity: 1;
  }
`;

export default memo(({
  id,
  name,
  quantity,
  add,
  remove
}) => (
  <Container>
    <ProductQuantity>{quantity}</ProductQuantity>
    <ProductName>{name}</ProductName>
    <ProductControls>
      <ToolTip label='Remove item'>
        <ControlButton
          icon={<RemoveIcon height={12} color={Colors.RED} />}
          onClick={remove}
        />
      </ToolTip>
      <ToolTip label='Add item'>
        <ControlButton
          icon={<AddIcon height={12} color={Colors.BLUE} />}
          onClick={add}
        />
      </ToolTip>
    </ProductControls>
  </Container>
));
