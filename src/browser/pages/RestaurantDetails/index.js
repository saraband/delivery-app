import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import LazyImage from 'COMPONENTS/LazyImage';
import Basket from 'COMPONENTS/Basket';
import { ProductControls, ControlButton } from 'COMPONENTS/Basket';
import ToolTip from 'COMPONENTS/ToolTip';
import RemoveIcon from 'ICONS/RemoveIcon';
import Colors from 'CONSTANTS/Colors';
import AddIcon from 'ICONS/AddIcon';
import BreadCrumb from 'COMPONENTS/BreadCrumb';
import Routes, { addParamsToUrl } from 'ROUTES';

const BannerImage = styled(LazyImage)`
  width: 100%;
  height: 300px;
`;

const GET_PRODUCTS_LIST = gql`
  query productsOfRestaurant ($id: ID!) {
    restaurant (id: $id) {
      id
      name
      rating
      thumbnail
      imageUrl
      tags
    }
    
    productsList(restaurantId: $id) {
      id
      name
      price
      ingredients
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuSection = styled.div`
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
`;

const BasketSection = styled.div`
  flex-grow: 0;
  width: 300px;
  flex-shrink: 0;
  position: relative;
  margin-left: 20px;
`;

const Product = styled.div`
  width: 350px;
  height: 100px;
  padding: 20px;
  position: relative;
  margin: 20px;
  margin-left: 0;
  margin-bottom: 0;
  cursor: pointer;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  
  &:hover {
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  }
`;

const NavSection = styled.div``;
const BodySection = styled.div`
  display: flex;
`;

const ProductInformation = styled.div`
  flex-grow: 1;
`;
const ProductName = styled.h4``;
const ProductIngredients = styled.p``;

export default class extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { id, city, name } = this.props.match.params;

    return (
      <Query query={GET_PRODUCTS_LIST} variables={{ id }}>
        {({ error, loading, data }) => {
          if (error) return <p>Error</p>;
          if (loading) return <p>Loading</p>;

          return (
            <Container>
              <NavSection>
                <BreadCrumb>
                  {[
                    {
                      label: 'home',
                      url: Routes.HOME,
                      tip: 'Home page'
                    },
                    {
                      label: city,
                      url: addParamsToUrl(Routes.RESTAURANTS_LIST, { city }),
                      tip: `Restaurants around ${city}`
                    },
                    {
                      label: name
                    }
                  ]}
                </BreadCrumb>
              </NavSection>
              <BodySection>
                <MenuSection>
                  <BannerImage
                    url={data.restaurant.imageUrl}
                    thumbnail={data.restaurant.thumbnail}
                    alt={data.restaurant.name}
                  />
                  {data && data.productsList.map(({ id, name, price, ingredients }) => (
                    <Product key={id}>
                      <ProductInformation>
                        <ProductName>{name}</ProductName>
                        <ProductIngredients>{ingredients.join(', ')}</ProductIngredients>
                      </ProductInformation>
                      <ProductControls>
                        <ToolTip label='Remove item'>
                          <ControlButton icon={<RemoveIcon height={12} color={Colors.RED} />} />
                        </ToolTip>
                        <ToolTip label='Add item'>
                          <ControlButton icon={<AddIcon height={12} color={Colors.GREEN} />} />
                        </ToolTip>
                      </ProductControls>
                    </Product>
                  ))}
                </MenuSection>
                <BasketSection>
                  <Basket id={id} />
                </BasketSection>
              </BodySection>
            </Container>
          );
        }}
      </Query>
    );
  }
}
