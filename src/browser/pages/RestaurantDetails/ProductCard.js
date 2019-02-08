import React, {memo} from 'react';
import styled from 'styled-components';
import { ProductControls, ControlButton } from 'COMPONENTS/Basket/Product';
import ToolTip from 'COMPONENTS/ToolTip';
import RemoveIcon from 'ICONS/RemoveIcon';
import AddIcon from 'ICONS/AddIcon';
import Colors from 'CONSTANTS/Colors';
import FontSizes from 'CONSTANTS/FontSizes';
import {hexToRgbaString} from 'HELPERS';

const LightBoxShadowRGBA = hexToRgbaString(Colors.BLUE, 0.2);
const Product = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  border: 1px solid ${Colors.LIGHT_GREY};
  transition: box-shadow 0.2s ease-in-out;
  
  &:hover {
    border-color: ${Colors.BLUE};
  }
  
  ${p => p.selected
    ? `box-shadow: 0px 0px 0px 4px ${LightBoxShadowRGBA};`
    : ''
  }
`;

const Container = styled.div`
  width: 50%;
  height: 100px;
  position: relative;
  cursor: pointer;
  border-radius: 3px;
  padding-left: 10px;
  padding-bottom: 20px;
  
  &:nth-child(even) {
    padding-left: 0px;
    padding-right: 10px;
  }
`;

const ProductInformation = styled.div`
  flex-grow: 1;
`;

const ProductName = styled.h4`
  font-weight: ${Colors.GREY};
  font-weight: normal;
  font-size: ${FontSizes.NORMAL};
`;

const ProductPrice = styled.span`
  color: ${Colors.BLUE};
`;

const ProductIngredients = styled.p`
  color: ${Colors.DARK_GREY};
  margin-top: 5px;
  font-weight: lighter;
  font-size: ${FontSizes.SMALL};
`;

export default class extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.selected !== this.props.selected
  }

  render() {
    const {
      id,
      name,
      price,
      ingredients,
      selected,
      addProduct,
      removeProduct
    } = this.props;

    return (
      <Container>
        <Product selected={selected}>
          <ProductInformation>
            <ProductName>{name}<ProductPrice>&nbsp;&nbsp;{price} €</ProductPrice></ProductName>
            <ProductIngredients>{ingredients.join(', ')}</ProductIngredients>
          </ProductInformation>
          <ProductControls>
            <ToolTip label='Remove item'>
              <ControlButton
                onClick={removeProduct}
                icon={<RemoveIcon height={12} color={Colors.RED}/>}
              />
            </ToolTip>
            <ToolTip label='Add item'>
              <ControlButton
                onClick={addProduct}
                icon={<AddIcon height={12} color={Colors.GREEN}/>}
              />
            </ToolTip>
          </ProductControls>
        </Product>
      </Container>
    );
  }
};
